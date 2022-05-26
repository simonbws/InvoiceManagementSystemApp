import { defineStore } from 'pinia'

export const user = defineStore({
  id: 'user',
  state: () =>({
    _roleCreate: false,
    _roleAccept: false,
    _roleAdmin: false,
    _userEmail: ''
  }),
  getters: {
    roleCreate: state => state._roleCreate,
    roleAccept: state => state._roleAccept,
    roleAdmin: state => state._roleAdmin,
    userEmail: state => state._userEmail
  },
  actions:{
    setAdmin(v) { this._roleAdmin = v},
    setAccept(v) { this._roleAccept = v},
    setCreate(v) { this._roleCreate = v},
    setEmail(v) { this._userEmail = v}
  }
})