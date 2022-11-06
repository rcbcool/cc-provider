import { User } from "../entity/User"
import { UserCard } from "../entity/UserCard"
import { UserCardRecord } from "../entity/UserCardRecord"
import { myDataSource } from "../app-data-source"

type Card = {
    name: string;
    number: number;
    limit: number;
    amount: number;
  };

async function addUserCard(name: string, card_no: string, limit: number) {

    // card_no -> encrypt

    const user = new User()
    user.name = name
    await myDataSource.manager.save(user)

    const userCard = new UserCard()
    userCard.card_no = card_no
    userCard.user = user
    await myDataSource.manager.save(userCard)

    const userCardRecord = new UserCardRecord()
    userCardRecord.limit = limit
    userCardRecord.amount = 0
    userCardRecord.user = user
    userCardRecord.usercards = [userCard]
    await myDataSource.manager.save(userCardRecord)

    return true
}

async function validateCard(card_no:number) {

    if(card_no < 99) {
        return false
    } else {
        return true
    }

}

async function getAllUserCards() {

    const userCardList = await myDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.cards", "usercard")
    .leftJoinAndSelect("usercard.usercardrecords", "usercardrecords")
    .getMany()

    const results : Card[] = [];
    userCardList.forEach(userDetail => {
      const name = userDetail.name;
      let num = 0, amt = 0, limit = 0;
      userDetail.cards.forEach(userCardDetail => {
        num = parseInt(userCardDetail.card_no);
        userCardDetail.usercardrecords.forEach(userTxn => {
            amt = (userTxn.amount);
            limit = (userTxn.limit);
        })
      })

      results.push({name: name, number: num, amount: amt, limit: limit});
    })

    return results
}

export { addUserCard, validateCard, getAllUserCards }