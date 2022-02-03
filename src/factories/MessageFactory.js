import faker from "faker";

const createFakers = async (req, res) => {
    let messages = [];
    for (let index = 1; index <= 5; index++) {
        messages.push({
            author: {
                id: faker.internet.exampleEmail(),
                firstName: faker.name.firstName(),
                lastName:faker.name.lastName(),
                age: "faker.",
                alias: faker.name.firstName(),
                avatar: faker.image.image(),
            },
            date: faker.date.weekday(),
            text: faker.lorem.sentence()
        })
    }  
    if (req.baseUrl == '/api/messages') {
        res.send(messages)  
    } else {
        res.render('./messagesTest/messagesTest', {messages});
    }
}


export { createFakers } 