import instance from './http'

export function getInstructorList() {
    return instance({
      url: "instructor/instructorList",
      method: 'get',
    })
  }
  
  
  export function changeInstructorInfo(data:any) {
    return instance({
      url: "instructor/changeInstructorInfo",
      method: 'post',
      data
    })
  }
  
  
  export function addInstructor(data:any) {
    return instance({
      url: "instructor/addInstructor",
      method: 'post',
      data
    })
  }
  
  export function deleteInstructor(data:any) {
    return instance({
      url: "Instructor/deleteInstructor",
      method: 'post',
      data
    })
  }