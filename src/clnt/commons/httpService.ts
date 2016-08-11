
import * as axios from 'axios';

const baseUrl: string = '/api/v1/'

export default class DataService {

  public static async load(url: string) {
    url = baseUrl + url + "Writable";
    return axios
      .get(url)
      .then(response => {
        //console.log(response);
        let data: any = response.data

        // this.posts = data.results
        // this.is_loading = false
        // this.next = data.next,
        // this.prev = data.previous,
        // this.count = data.count;
        return response;
      });
  }

  public static async loadById(url: string, id: number) {
    url = baseUrl + url + "Writable" + "/" + id;
    return axios
      .get(url)
      .then(response => {
        //console.log(response);
        let data: any = response.data
        return data;
      });
  }

  public static async onSubmit(url, formData) {
    console.log("submitting " + formData);
    //this.selectedPost = formData;
    url = baseUrl + url + "Writable";
    // console.log('selected entity is ' + this.selectedPostJS())
    let id = formData.id
    if (!id)
      return axios.post(url, formData)
        .then(response => response)
        .catch(error => { throw error});
    else {
      return axios.put(url + "/" + id, formData)
        .then(response => response)
        .catch(error => { throw error} );
    }
  }

}