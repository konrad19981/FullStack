/* id które można przetestować:
RU35L1ET1L7tkTZHP3eK
aNkLjpKhZs4B9cKVF2h9
oI6YcMbbW153utowsgOp
sFnak528u9Fvk4Zxos8r
 */


const request = require('supertest');
const app = require('./server');
const chai = require('chai');
const expect = chai.expect;
describe('Testy jednostkowe', () => {
    it('Powinno dodać zadanie', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({ content: 'Nowe zadanie', done: 'false' });
        expect(response.statusCode).equal(302);
    });

    it('Powinno usunąć zadanie', async () => {
        const taskId = 'QwruXK5VKYD29dBgBg6G';
        const response = await request(app)
            .post(`/tasks/${taskId}`);
        expect(response.statusCode).equal(302);
    });

    it('Powinno zaktualizować zadanie', async () => {
        const taskId = 'aNkLjpKhZs4B9cKVF2h9';
        const response = await request(app)
            .post(`/update/${taskId}`)
            .send({ newContent: 'Nowa treść', newDone: 'true' });
        expect(response.statusCode).to.equal(302);
    });
});