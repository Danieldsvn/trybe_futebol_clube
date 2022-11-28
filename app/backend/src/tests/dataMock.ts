export const user = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

export const dbUser = {
  id:  1,
  username: 'Admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  role: 'admin' 
}

export const noEmailUser1 = {
  password: 'secret_admin'
}

export const noEmailUser2 = {
  email: '',
  password: 'secret_admin'
}

export const noPasswordUser1 = {
  email: 'admin@admin.com',  
}

export const noPasswordUser2 = {
  email: 'admin@admin.com',
  password: ''  
}

export const invalidEmailUser = {
  email: 'admin@admin.co',
  password: 'secret_admin'
}