// Mock user database for demo purposes
const users = [
  {
    id: "user-1",
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    phone: "0412345678",
    dob: "1990-01-01",
  },
  {
    id: "user-2",
    email: "jane@example.com",
    firstName: "Jane",
    lastName: "Smith",
    phone: "0423456789",
    dob: "1985-05-15",
  },
]

export async function findUserByEmail(email: string) {
  return users.find((user) => user.email === email) || null
}

export async function createUser(userData: any) {
  const newUser = {
    id: `user-${users.length + 1}`,
    ...userData,
  }
  users.push(newUser)
  return newUser
}

export async function updateUser(id: string, userData: any) {
  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex === -1) return null

  const updatedUser = {
    ...users[userIndex],
    ...userData,
  }
  users[userIndex] = updatedUser
  return updatedUser
}

export async function getAllUsers() {
  return users
}
