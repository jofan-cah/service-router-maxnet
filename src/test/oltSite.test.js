const request = require('supertest');
const app = require('../../app');
const { sequelize, OltSite } = require('../../models');
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('OltSite API', () => {
  let createdOltId;

  it('should create a new OltSite', async () => {
    const res = await request(app)
      .post('/oltsites')
      .send({
        olt_name: 'Test Olt',
        olt_description: 'Test Description',
        olt_picture: 'test.jpg',
        olt_type_id: 1,
        olt_location_maps: 'Location',
        olt_address: 'Address',
        olt_port_capacity: 100,
        url: 'http://test.com',
        username: 'testuser',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('olt_id');
    createdOltId = res.body.olt_id; // Simpan ID untuk tes berikutnya
  });

  it('should get all OltSites', async () => {
    const res = await request(app).get('/oltsites');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).toHaveLength(1); // Harus ada satu OltSite yang sudah dibuat
  });

  it('should get OltSite by ID', async () => {
    const res = await request(app).get(`/oltsites/${createdOltId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('olt_id', createdOltId);
  });

  it('should update an OltSite by ID', async () => {
    const res = await request(app)
      .put(`/oltsites/${createdOltId}`)
      .send({
        olt_name: 'Updated Olt',
        olt_description: 'Updated Description',
        olt_picture: 'updated.jpg',
        olt_type_id: 2,
        olt_location_maps: 'Updated Location',
        olt_address: 'Updated Address',
        olt_port_capacity: 200,
        url: 'http://updated.com',
        username: 'updateduser',
        password: 'updatedpassword'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('olt_id', createdOltId);
    expect(res.body).toHaveProperty('olt_name', 'Updated Olt');
  });

  it('should delete an OltSite by ID', async () => {
    const res = await request(app).delete(`/oltsites/${createdOltId}`);
    expect(res.statusCode).toEqual(204); // Biasanya 204 untuk penghapusan yang sukses
  });

  it('should not find deleted OltSite', async () => {
    const res = await request(app).get(`/oltsites/${createdOltId}`);
    expect(res.statusCode).toEqual(404); // 404 jika tidak ditemukan
  });
});