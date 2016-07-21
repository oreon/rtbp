import os
import sys

from codecs import encode
from random import randint
import getopt
import inspect
import types
from functools import reduce

__doc__ = \
'''
A python script that re-orders out of sequence class defintions
'''

class rebase_meta(type):
    '''
    Rebase metaclass
    Automatically rebases classes created with this metaclass upon
    modification of classes base classes
    '''
    org_base_classes = {}
    org_base_classes_subs = {}
    base_classes = {}
    base_classes_subs = {}
    mod_loaded = False
    mod_name = ""
    mod_name_space = {}
    def __init__(cls, cls_name, cls_bases, cls_dct):
        #print "Making class: %s" % cls_name
        super(rebase_meta, cls).__init__(cls_name, cls_bases, cls_dct)

        # Remove the old base sub class listings
        bases = rebase_meta.base_classes_subs.items()
        for (base_cls_name, sub_dict) in bases:
            sub_dict.pop(cls_name, None)

        # Add class to bases' sub class listings
        for cls_base in cls_bases:
            if(not rebase_meta.base_classes_subs.has_key(cls_base.__name__)):
                rebase_meta.base_classes_subs[cls_base.__name__] = {}
            rebase_meta.base_classes[cls_base.__name__] = cls_base
            rebase_meta.base_classes_subs[cls_base.__name__][cls_name] = cls

        # Rebase the sub classes to the new base
        if(rebase_meta.base_classes.has_key(cls_name)): # Is class a base class
            subs = rebase_meta.base_classes_subs[cls_name]
            rebase_meta.base_classes[cls_name] = cls # Update base class dictionary to new class

            for (sub_cls_name, sub_cls) in subs.items():
                if(cls_name == sub_cls_name):
                    continue
                sub_bases_names = [x.__name__ for x in sub_cls.__bases__]
                sub_bases = tuple([rebase_meta.base_classes[x] for x in sub_bases_names])
                try:
                    # Attempt to rebase sub class
                    sub_cls.__bases__ = sub_bases
                    #print "Rebased class: %s" % sub_cls_name
                except TypeError:
                    # The old sub class is incompatible with the new base class, so remake the sub
                    if(rebase_meta.mod_loaded):
                        new_sub_cls = rebase_meta(sub_cls_name, sub_bases, dict(sub_cls.__dict__.items() + [("__module__", rebase_meta.mod_name)]))
                        rebase_meta.mod_name_space[sub_cls_name] = new_sub_cls
                    else:
                        new_sub_cls = rebase_meta(sub_cls_name, sub_bases, dict(sub_cls.__dict__.items()))
                    subs[sub_cls_name] = new_sub_cls

    @classmethod
    def register_mod(self, imod_name, imod_name_space):
        if(not self.mod_loaded):
            self.org_base_classes = self.base_classes.copy()
            self.org_base_classes_subs = self.base_classes_subs.copy()
            self.mod_loaded = True
        else:
            self.base_classes = self.org_base_classes
            self.base_classes_subs = self.org_base_classes_subs
        self.mod_name = imod_name
        self.mod_name_space = imod_name_space

# Can't subclass these classes
forbidden_subs = \
[
    "bool",
    "buffer",
    "memoryview",
    "slice",
    "type",
    "xrange",
]

# Builtin, sub-classable classes
org_class_types = filter(lambda x: isinstance(x, type) and (not x.__name__ in forbidden_subs) and x.__module__ == "__builtin__", types.__builtins__.values())

# Builtin classes recreated with Rebasing metaclass
class_types = [(cls.__name__, rebase_meta(cls.__name__, (cls,), {})) for cls in org_class_types]

# Overwrite builtin classes
globals().update(class_types)

class mr_quiet(dict):
    '''
    A namespace class that creates placeholder classes upon
    a non existant lookup. mr_quiet does not say much.
    '''
    def __getitem__(self, key):
        if(not key in self.keys()):
            if(hasattr(__builtins__, key)):
                return getattr(__builtins__, key)
            else:
                if(not key in self.keys()):
                    self.sanity_check()
                return self.setdefault(key, rebase_meta(key, (object,), {}))
        else:
            return dict.__getitem__(self, key)
    def sanity_check(self):
        pass

class mr_agreeable(mr_quiet):
    '''
    A talkative cousin of mr_quiet.
    '''
    sin_counter = 0
    nutty_factor = 0
    rdict = {0 : (0, 9), 200 : (10, 14), 500 : (15, 16), 550 : (17, 22)}
    def sanity_check(self):
        self.prognogsis()
        print (self.insanity())
    def prognogsis(self):
        self.sin_counter += 1
        self.nutty_factor = max(filter(lambda x: x < self.sin_counter, self.rdict.keys()))
    def insanity(self):
        insane_strs = \
        [
            "Nofbyhgryl", "Fher, jul abg?", "Sbe fher", "Fbhaqf terng", "Qrsvangryl", "Pbhyqa'g nterr zber",
            "Jung pbhyq tb jebat?", "Bxl Qbnxl", "Lrc", "V srry gur fnzr jnl", "Zneel zl qnhtugre",
            "Znlor lbh fubhyq svk gung", "1 AnzrReebe vf bar gbb znal naq n 1000'f abg rabhtu", "V'ir qbar qvegvre guvatf",
            "Gur ebbz vf fgnegvat gb fcva", "Cebonoyl abg", "Npghnyyl, ab ..... nyevtug gura", "ZNXR VG FGBC",
            "BU TBQ AB", "CYRNFR AB", "LBH'ER OERNXVAT CLGUBA", "GUVF VF ABG PBAFRAGHNY", "V'Z GRYYVAT THVQB!!"
        ]
        return encode("ze_nterrnoyr: " + insane_strs[randint(*self.rdict[self.nutty_factor])], "rot13")

def coll_up(ilist, base = 0, count = 0):
    '''
    Recursively collapse nested lists at depth base and above
    '''
    tlist = []
    if(isinstance(ilist, __builtins__.list) or isinstance(ilist, __builtins__.tuple)):
        for q in ilist:
            tlist += coll_up(q, base, count + 1)
    else:
        if(base > count):
            tlist = ilist
        else:
            tlist = [ilist]
    return [tlist] if((count != 0) and (base > count)) else tlist

def build_base_dict(ilist):
    '''
    Creates a dictionary of class : class bases pairs
    '''
    base_dict = {}
    def build_base_dict_helper(iclass, idict):
        idict[iclass] = list(iclass.__bases__)
        for x in iclass.__bases__:
            build_base_dict_helper(x, idict)
    for cur_class in ilist:
        build_base_dict_helper(cur_class, base_dict) 
    return base_dict

def transform_base_to_sub(idict):
    '''
    Transforms a base dict into dictionary of class : sub classes pairs
    '''
    sub_dict = {}
    classes = idict.keys()
    for cur_class in idict:
        sub_dict[cur_class] = filter(lambda cls: cur_class in idict[cls], classes)
    return sub_dict

recur_class_helper = lambda idict, ilist = []: [[key, recur_class_helper(idict, idict[key])] for key in ilist]
recur_class = lambda idict: recur_class_helper(idict, idict.keys())

class proc_func(list):
    '''
    Cmdline processing class
    '''
    def __init__(self, name = "", *args, **kwargs):
        self.name = name
        super(list, self).__init__(*args, **kwargs)

    def get_args(self, *args):
        self.extend(filter(lambda x: x, args))

    def __call__(self, *args):
        print (self.name)
        print (self)

class proc_inputs(proc_func):
    def get_args(self, *args):
        self.extend(filter(os.path.isfile, args))

class proc_outputs(proc_func):
    pass

class proc_helper(proc_func):
    '''
    Help function
    Print help information
    '''
    def get_args(self, *args):
        self()
    def __call__(self, *args):
        print (__file__)
        print (__doc__)
        print ("Help:\n\t%s -h -i inputfile -o ouputfile" % sys.argv[0])
        print ("\t\t-h or --help\tPrint this help message")
        print ("\t\t-i or --input\tSpecifies the input script")
        print ("\t\t-o or --output\tSpecifies the output script")
        sys.exit()

if __name__ == "__main__":
    proc_input = proc_inputs("input")
    proc_output = proc_outputs("output")
    proc_help = proc_helper("help")

    cmd_line_map = \
    {
        "-i"      : proc_input,
        "--input" : proc_input,
        "-o"      : proc_output,
        "--ouput" : proc_output,
        "-h"      : proc_help,
        "--help"  : proc_help
    }

    try:
        optlist, args = getopt.getopt(sys.argv[1:], "hi:o:", ["help", "input=", "output="])
        for (key, value) in optlist:
            cmd_line_map[key].get_args(value)
    except getopt.GetoptError:
        proc_help()
    if(len(proc_input) != len(proc_output)):
        print ("Input files must have a matching output file")
        proc_help()
    elif(not proc_input):
        proc_help()
    else:
        in_out_pairs = zip(proc_input, proc_output)
        for (in_file, out_file) in in_out_pairs:

            dodgy_module_name = os.path.splitext(in_file)[0]
            sys.modules[dodgy_module_name] = types.ModuleType(dodgy_module_name)
            sys.modules[dodgy_module_name].__file__ = in_file

            # Make a fake space post haste
            name_space = mr_agreeable\
            (
                [
                    ("__name__", dodgy_module_name),   # Needed for the created classes to identify with the 'module'
                    ("__module__", dodgy_module_name), # Needed to fool the inspect module
                ] + \
                class_types
            )

            # Exclude these from returning
            exclusions = name_space.keys()

            # Associate the fake name space to the rebasing metaclass
            rebase_meta.register_mod(dodgy_module_name, name_space)

            # Run dodgy code
            execfile(in_file, name_space)

            # Bring back dodgy classes
            import_classes = [cls if(isinstance(cls, type) and not cls_name in exclusions) else None for (cls_name, cls) in name_space.items()]
            dodgy_import_classes = filter(lambda x: x, import_classes)

            # Create base and sub class dictionaries
            base_dict = build_base_dict(dodgy_import_classes)
            sub_dict = transform_base_to_sub(base_dict)

            # Create sets of base and sub classes
            base_set = reduce(lambda x, y: x | y, map(set, base_dict.values()), set([]))
            sub_set = reduce(lambda x, y: x | y, map(set, sub_dict.values()), set([]))
            kings = list(base_set - sub_set) # A list of bases which are not subs
            kingdoms = recur_class_helper(sub_dict, kings) # A subclass tree of lists
            lineages = coll_up(kingdoms, 2) # Flatten the tree branches at and below 2nd level

            # Filter only for the clases created in the dodgy module
            inbred_lines = [filter(lambda x: x.__module__ == dodgy_module_name, lineage) for lineage in lineages]

            # Load Source
            for lineage in inbred_lines:
                for cls in lineage:
                    setattr(cls, "_source", inspect.getsource(cls))

            # Write Source
            with open(out_file, "w") as file_h:
                for lineage in inbred_lines:
                    for cls in lineage:
                        file_h.write(cls._source + "\n")