import instance from './http'

// 登录
export function studentLogin(data: any) {
  return instance({
    url: "student/login",
    method: 'post',
    data,
  })
}

export function instructorLogin(data: any) {
  return instance({
    url: "instructor/login",
    method: 'post',
    data,
  })
}

export function adminLogin(data: any) {
  return instance({
    url: "admin/login",
    method: 'post',
    data,
  })
}