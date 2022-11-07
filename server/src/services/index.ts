import { User } from "../entity/User";
import { UserCard } from "../entity/UserCard";
import { UserCardRecord } from "../entity/UserCardRecord";
import { myDataSource } from "../app-data-source";

type Card = {
  name: string;
  card_no: string;
  limit: number;
  amount: number;
  txnid: number;
};

async function addUserCard(name: string, card_no: string, limit: number) {
  try {
    const user = new User();
    user.name = name;
    await myDataSource.manager.save(user);

    const userCard = new UserCard();
    userCard.card_no = card_no;
    userCard.user = user;
    await myDataSource.manager.save(userCard);

    const userCardRecord = new UserCardRecord();
    userCardRecord.limit = limit;
    userCardRecord.amount = 0;
    userCardRecord.user = user;
    userCardRecord.usercards = [userCard];
    await myDataSource.manager.save(userCardRecord);

    return true;
  } catch (err) {
    return false;
  }
}

async function validateCard(card_no: string) {
  if (card_no.length > 19) return false;

  let newCno = card_no.split("").reverse();
  let set: number[] = [];

  for (let i = 0; i < newCno.length; i++) {
    if (i % 2 !== 0) {
      let cur: number = parseInt(newCno[i]);
      let num: number = 0;
      if (cur + cur > 9) {
        num = cur + cur;
        num =
          parseInt(num.toString().charAt(0)) +
          parseInt(num.toString().charAt(1));
      } else {
        num = cur + cur;
      }
      set.push(num);
    } else {
      set.push(parseInt(newCno[i]));
    }
  }

  let total: number = set.reduce((p, c) => p + c);
  if (total % 10 === 0) return true;
  else return false;
}

async function getAllUserCards() {
  const userCardList = await myDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.cards", "usercard")
    .innerJoinAndSelect("usercard.usercardrecords", "usercardrecords")
    .getMany();

  const results: Card[] = [];
  userCardList.forEach((userDetail) => {
    const name = userDetail.name;
    let num: string = "",
      amt: number = 0,
      limit: number = 0,
      txnid: number = 0;
    userDetail.cards.forEach((userCardDetail) => {
      num = userCardDetail.card_no;
      userCardDetail.usercardrecords.forEach((userTxn) => {
        txnid = userTxn.id;
        amt = userTxn.amount;
        limit = userTxn.limit;
      });
    });

    results.push({
      name: name,
      card_no: num,
      amount: amt,
      limit: limit,
      txnid: txnid,
    });
  });

  return results;
}

export { addUserCard, validateCard, getAllUserCards };
