import instance from './http'

export function getAdminList() {
    return instance({
      url: "admin/AdminList",
      method: 'get',
    })
  }
  
  
  export function changeAdminInfo(data:any) {
    return instance({
      url: "admin/changeAdminInfo",
      method: 'post',
      data
    })
  }
  
  
  export function addAdmin(data:any) {
    return instance({
      url: "admin/addAdmin",
      method: 'post',
      data
    })
  }
  
  export function deleteAdmin(data:any) {
    return instance({
      url: "admin/deleteAdmin",
      method: 'post',
      data
    })
  }