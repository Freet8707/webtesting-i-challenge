const { fail } = require('./enhancer.js');
const enhancer = require('./enhancer.js');
// test away!
describe("it should set a value(durability) to 100 in an item object", () => {
    it("should have a durability value", () => {
        //arrange, act, assert 
        expect(() => {
            enhancer.repair({
                name: "Legendary Greatsword",
                durability: 0,
                enhancement: 5
            })
        }).toThrow()
    });

    it("durability should be a number value", () => {

        expect(() => {
            enhancer.repair({
                name: "Legendary Greatsword",
                durability: "hey",
                enhancement: 5
            })
        }).toThrow()
    })
    it("should throw if error is > 100", () => {

        expect(() => {
            enhancer.repair({
                name: "Legendary Greatsword",
                durability: 110,
                enhancement: 5
            })
        }).toThrow()
        
    })

    it("should return a message if durability is set to 100", () => {
        const testItem = {
            name: "Legendary Greatsword",
            durability: 100,
            enhancement: 5
        }

        const repairedItem = enhancer.repair(testItem)

        expect(repairedItem.message).toBe("Your item is already fixed you big oaf.")
    })

    it("should set durability value to 100 if value is < 100", () => {
        const testItem = {
            name: "Legendary Greatsword",
            durability: 10,
            enhancement: 5
        }

        const repairedItem = enhancer.repair(testItem)

        expect(repairedItem).toEqual({
            name: "Legendary Greatsword",
            durability: 100,
            enhancement: 5
        })
    })
})

describe("Upon successful enhancement the value should increment by one", () => {

    it("Should have an enhancement value", () => {
        const testItem = {
            name: "Legendary Greatsword",
            durability: 100,
            enhancement: null
        }

        expect(() => {
            enhancer.success(testItem)
        }).toThrow()
    })

    it("enhancement should be a number value", () => {
        const testItem = {
            name: "Legendary Greatsword",
            durability: 100,
            enhancement: "huh?"
        }

        expect(() => {
            enhancer.success(testItem)
        }).toThrow()
    })

    it("Should throw if enhancement is greater than 20", () => {
        const testItem = {
            name: "Legendary Greatsword",
            durability: 100,
            enhancement: 25
        }

        expect(() => {
            enhancer.success(testItem)
        }).toThrow()
    })

    it("should return a message if enhancement is at max value(20)", () => {
        const testItem = {
            name: "Legendary Greatsword",
            durability: 100,
            enhancement: 20
        }

        const enhancementCheck = enhancer.success(testItem)

        expect(enhancementCheck.message).toBe("You've already enhanced this item to its maximum limit")
    })

    it("should increment enhancement by 1", () => {
        const testItem = {
            name: "Legendary Greatsword",
            durability: 100,
            enhancement: 10
        }

        const enhancementCheck = enhancer.success(testItem)

        expect(enhancementCheck).toEqual({
            name: "Legendary Greatsword",
            durability: 100,
            enhancement: 11
        })
    })

})

describe("If the fail method is called, then the applicable rules are executed", () => {

    it("checks if there is an enhancement and durability value", () => {
        const testItem = {
            name: "Legendary Greatsword",
            durability: 0,
            enhancement: 0
        }

        expect(() => {
            enhancer.fail(testItem)
        }).toThrow()
    })

    it("checks if durability and enhancement values are numbers", () => {
        const testItem = {
            name: "Legendary Greatsword",
            durability: "100",
            enhancement: "heyyo"
        }

        expect(() => {
            enhancer.fail(testItem)
        }).toThrow()
    })
    
    it("if enhancement is less than 15, then durability should decrease by 5", () => {
        const testItem = {
            name: "Legendary Greatsword",
            durability: 100,
            enhancement: 14
        }

        const failItem = enhancer.fail(testItem);

        expect(failItem).toEqual({
            name: "Legendary Greatsword",
            durability: 95,
            enhancement: 14
        })
    })

    it("if enhancement is greater than or equal to 15, then durability should decrease by 10", () => {
        const testItem = {
            name: "Legendary Greatsword",
            durability: 100,
            enhancement: 15
        }

        const failItem = enhancer.fail(testItem);

        expect(failItem).toEqual({
            name: "Legendary Greatsword",
            durability: 90,
            enhancement: 15
        })
    })

    it("if enhancement is greater than 16 then the enhancement level should decrease by one", () => {
        const testItem = {
            name: "Legendary Greatsword",
            durability: 100,
            enhancement: 17
        }

        const failItem = enhancer.fail(testItem);

        expect(failItem).toEqual({
            name: "Legendary Greatsword",
            durability: 90,
            enhancement: 16
        })
    })
})