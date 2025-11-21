class UsetableListApi {
  // add: any;
  get: any;
  getPaginated: any;
  list: any;
  // getPaginated: any; //add: any, get: any, getPaginated: any
  constructor(payload: any) {
    // this.add = add;
    this.get = payload.get;
    this.list = [];
    this.getPaginated = payload.getPaginated;
  }

  async getList() {
    this.list = await this.get();
    return this.list;
  }

  async getPaginatedList() {
    this.list = await this.getPaginated();
    return this.list.data.patients;
  }
}

export default UsetableListApi;
