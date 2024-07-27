const request = require('supertest');
const app = require('../../app');
const { sequelize, OdcSite } = require('../../models');
beforeAll(async () => {
  await sequelize.sync({ force: true });
  
});

describe('OdcSite API', () => {
  let createdOdcId;

  it('should create a new OdcSite', async () => {
    const res = await request(app)
      .post('/odcsites')
      .send({
        odc_name: 'Test Odc',
        odc_description: 'Test Description',
        odc_picture: 'test.jpg',
        odc_type_id: 1,
        odc_location_maps: 'Location',
        odc_address: 'Address',
        odc_port_capacity: 100,
        odp_id: 1 // Pastikan OdpSite dengan ID ini ada
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('odc_id');
    createdOdcId = res.body.odc_id; // Simpan ID untuk tes berikutnya
  });

  it('should get all OdcSites', async () => {
    const res = await request(app).get('/odcsites');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).toHaveLength(1); // Harus ada satu OdcSite yang sudah dibuat
  });

  it('should get OdcSite by ID', async () => {
    const res = await request(app).get(`/odcsites/${createdOdcId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('odc_id', createdOdcId);
  });

  it('should update an OdcSite by ID', async () => {
    const res = await request(app)
      .put(`/odcsites/${createdOdcId}`)
      .send({
        odc_name: 'Updated Odc',
        odc_description: 'Updated Description',
        odc_picture: 'updated.jpg',
        odc_type_id: 2,
        odc_location_maps: 'Updated Location',
        odc_address: 'Updated Address',
        odc_port_capacity: 200,
        odp_id: 1 // Pastikan OdpSite dengan ID ini ada
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('odc_id', createdOdcId);
    expect(res.body).toHaveProperty('odc_name', 'Updated Odc');
  });

  it('should delete an OdcSite by ID', async () => {
    const res = await request(app).delete(`/odcsites/${createdOdcId}`);
    expect(res.statusCode).toEqual(204); // Biasanya 204 untuk penghapusan yang sukses
  });

  it('should not find deleted OdcSite', async () => {
    const res = await request(app).get(`/odcsites/${createdOdcId}`);
    expect(res.statusCode).toEqual(404); // 404 jika tidak ditemukan
  });
});