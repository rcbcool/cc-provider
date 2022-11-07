import { validateCard } from '../services/';
import { expect } from 'chai';

describe('Validate card test', () => {
    it('card number is valid. Satisfies Luhn10 algorithm.', async () => {
        const cardNo = await validateCard("4539319503436467");
        
        expect(cardNo).to.be.true;
    });
});

describe('Validate card test', () => {
    it('card number is valid. Doesn\'t satisfy Luhn10 algorithm.', async () => {
        const cardNo = await validateCard("1111111111111111111");
        
        expect(cardNo).to.be.false;
    });
});

describe('Validate card test', () => {
    it('Card number is invalid. Card number is > 19 numerics.', async () => {
        const cardNo = await validateCard("45393195034364679987665667");
        
        expect(cardNo).to.be.false;
    });
});