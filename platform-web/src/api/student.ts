import instance from './http'


export function getStudentList() {
  return instance({
    url: "student/studentList",
    method: 'get',
  })
}


export function changeStudentInfo(data:any) {
  return instance({
    url: "student/changeStudentInfo",
    method: 'post',
    data
  })
}


export function addStudent(data:any) {
  return instance({
    url: "student/addStudent",
    method: 'post',
    data
  })
}

export function deleteStudent(data:any) {
  return instance({
    url: "student/deleteStudent",
    method: 'post',
    data
  })
}


export function getstudentInfo(data:any) {
  return instance({
    url: "student/studentInfo",
    method: 'post',
    data
  })
}



export function postReportForm(data:any) {
  return instance({
    url: "student/reportForm",
    method: 'post',
    data
  })
}

export function getReportForm(data:any) {
  return instance({
    url: "student/reportFormInfo",
    method: 'post',
    data
  })
}

export function getReportFormList() {
  return instance({
    url: "student/reportFormList",
    method: 'get',
  })
}

export function postBackSchoolForm(data:any) {
  return instance({
    url: "student/backSchoolForm",
    method: 'post',
    data
  })
}

export function getBackSchoolFormInfo(data:any) {
  return instance({
    url: "student/backSchoolFormInfo",
    method: 'post',
    data
  })
}



export function postafterSchoolForm(data:any) {
  return instance({
    url: "student/afterSchoolForm",
    method: 'post',
    data
  })
}

export function getBackSchoolFormList() {
  return instance({
    url: "student/backSchoolFormList",
    method: 'get',
  })
}

export function getAfterSchoolFormList() {
  return instance({
    url: "student/afterSchoolFormList",
    method: 'get',
  })
}