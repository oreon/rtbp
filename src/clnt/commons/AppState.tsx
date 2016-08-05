import {observable, toJS, computed} from 'mobx';
import {observer} from 'mobx-react';
import * as axios from 'axios';

export const baseUrl: string = '/api/v1/'

export default class AppState {
    @observable timer = 0;
    //@observable  customers:any = [];

    @observable posts = []
    @observable selectedPost = {}
    //@observable form_data = {}
    @observable is_loading = true
    @observable is_saving = false

    @observable next = null;
    @observable prev = null;
    @observable count = 0;

    @observable currentError = null;
    @observable currentMessage = null;

    url: string;
    //baseUrl :string =  '/api/v1/'
    headers: any
    //@observable 
    formSchema: any
    uiSchema: any

    @observable searchString = "";

    @observable products = []
    @observable categorys = []

    @computed
    get cats() {
        console.log("in cats")
        return this.categorys.map(x => x.id);
    }

    uiSchemaJS() {
        return toJS(this.uiSchema)
    }

    //ls: LookupService  

    constructor(url: string, headers: any, formSchema:any, uiSchema: any) {
        this.url = baseUrl + url;
        this.headers = headers;
        this.formSchema = formSchema;
        this.uiSchema = uiSchema;
        //this.ls = new LookupService()
        //this.loadAll();
        //console.log("uiSchema "  + this.uiSchema);
        this.load(null);
    }


    load(url: string) {
        if (!url) url = this.url + "Writable";
        axios
            .get(url)
            .then(response => {
                //console.log(response);
                let data: any = response.data
                this.posts = data.results
                this.is_loading = false
                this.next = data.next,
                    this.prev = data.previous,
                    this.count = data.count;
            });
    }

    public goNext = () => { this.load(this.next); }

    public goPrev = () => { this.load(this.prev); }


    onSubmit(formData) {
        console.log("submitting " + formData);
        this.selectedPost = formData;
        let url = this.url + 'Writable'
        console.log('selected entity is ' + this.selectedPostJS())
        let id = (this.selectedPost as any).id
        if (!id)
            axios.post(url, formData)
                .then(response => this.saveSuccess(response, null))
                .catch(error => this.currentError = error);
        else {
            axios.put(url + "/" + id, formData)
                .then(response => this.saveSuccess(response, id))
                .catch(error => console.log(error));
        }
    }

    handleError(error) {
        this.currentError = error;
    }

    saveSuccess(response, id) {
        this.is_saving = false
        let entity = response.data;
        this.currentMessage = "Successfully saved."
        console.log("saved " + entity.firstName + entity.id)
        if (id)
            this.posts.forEach((item, i) => { if (item.id == id) this.posts[i] = entity });

        this.selectedPost = {}
    }

    public selectedPostJS = () => {
        let ps = toJS(this.selectedPost)
        console.log(ps);
        return toJS(this.selectedPost)
    }


    public selectPost = (post) => {
        this.is_saving = true;
        console.log("called " + post);
        this.selectedPost = post;
    }

    removePost(post) {
        // deleteObject({ bucket: config.cosmicjs.bucket }, { slug: post.slug }, (err, res) => {
        this.posts = this.posts.filter(apost => {
            return apost.id !== post.id
        })
        //})
    }


    loadAll() {
        this.loadlu("products", "products");
        this.loadlu("categorys", "categorys");

        // this["products"] =[{id:1,displayName:"sss"}]
        // this["categorys"] =[{id:1,displayName:"cat1"}]
    }


    loadlu(url: string, arr: string) {

        //if (!url) url =   this.url + "Writable";
        axios
            .get(baseUrl + url + "Lookup")
            .then(response => {
                let data: any = response.data
                arr = data.results
                this[url] = data.results
                console.log("categorys are ");
                console.log(toJS(this.categorys));
                return arr;
            })
            .catch(error => console.log(error));
    }
}




