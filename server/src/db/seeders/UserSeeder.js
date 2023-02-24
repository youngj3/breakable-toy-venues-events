import { User } from '../../models/index.js'
import { faker } from '@faker-js/faker'

class UserSeeder {
  static async seed(usersToSeed){
    const createUser = () => {
      return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        cryptedPassword: faker.internet.password()
      }
    }

    for (let i = 0; i < usersToSeed; i++) {
      const user = createUser()
      const currentUser = await User.query().findOne({email: user.email})
      if(!currentUser){
        await User.query().insert(user)
      }
    }
  }
}

export default UserSeeder