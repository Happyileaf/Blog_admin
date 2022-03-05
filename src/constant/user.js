/*
 * @Author: your name
 * @Date: 2022-03-04 15:31:18
 * @LastEditTime: 2022-03-05 09:22:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Blog_admin\src\constant\user.js
 */

export const education = [
  'Bachelor CMU',
  'Master CIT',
  'Dr MIT'
]
export const skills = [
  { name: 'HTML5', process: 60 },
  { name: 'CSS3', process: 60 },
  { name: 'Javascript', process: 60 }
]

export const socialAccount = [
  { platform: 'QQ', account: '123456', avatar: 'https://img2.baidu.com/it/u=2251201040,4120245779&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' },
  { platform: 'WeChat', account: '123456', avatar: 'https://img2.baidu.com/it/u=2251201040,4120245779&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' },
  { platform: 'Tictok', account: '123456', avatar: 'https://img2.baidu.com/it/u=2251201040,4120245779&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' }]
export const userInfo = {
  name: 'Happy',
  roles: ['admin'],
  avatar: 'https://img2.baidu.com/it/u=2251201040,4120245779&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  introduction: 'happy',
  company: 'microsoft',
  location: 'China',
  email: 'admin@test.com',
  website: 'admin@test.com',
  socialAccount: socialAccount,
  education: education,
  skills: skills
}
