const request = require('supertest');
const app = require('../../app');
const { sequelize, OdpSite, OdcSite } = require('../../models');

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Tambahkan data dummy ke OdcSites
  await OdcSite.create({
    odc_name: 'Test Odc',
    odc_description: 'Test Description',
    odc_picture: 'test.jpg',
    odc_type_id: 1,
    odc_location_maps: 'Location',
    odc_address: 'Address',
    odc_port_capacity: 100
  });
});

describe('OdpSite API', () => {
  let createdOdpId;

  it('should create a new OdpSite', async () => {
    const res = await request(app)
      .post('/odpsites')
      .send({
        odp_name: 'Test Odp',
        odp_description: 'Test Description',
        odp_picture: 'test.jpg',
        odp_type_id: 1,
        odp_location_maps: 'Location',
        odp_address: 'Address',
        odp_port_capacity: 100,
        odc_id: 1 // Pastikan OdcSite dengan ID ini ada
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('odp_id');
    createdOdpId = res.body.odp_id; // Simpan ID untuk tes berikutnya
  });

  it('should get all OdpSites', async () => {
    const res = await request(app).get('/odpsites');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).toHaveLength(1); // Harus ada satu OdpSite yang sudah dibuat
  });

  it('should get OdpSite by ID', async () => {
    const res = await request(app).get(`/odpsites/${createdOdpId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('odp_id', createdOdpId);
  });

  it('should update an OdpSite by ID', async () => {
    const res = await request(app)
      .put(`/odpsites/${createdOdpId}`)
      .send({
        odp_name: 'Updated Odp',
        odp_description: 'Updated Description',
        odp_picture: 'updated.jpg',
        odp_type_id: 2,
        odp_location_maps: 'Updated Location',
        odp_address: 'Updated Address',
        odp_port_capacity: 200,
        odc_id: 1 // Pastikan OdcSite dengan ID ini ada
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('odp_id', createdOdpId);
    expect(res.body).toHaveProperty('odp_name', 'Updated Odp');
  });

  it('should delete an OdpSite by ID', async () => {
    const res = await request(app).delete(`/odpsites/${createdOdpId}`);
    expect(res.statusCode).toEqual(204); // Biasanya 204 untuk penghapusan yang sukses
  });

  it('should not find deleted OdpSite', async () => {
    const res = await request(app).get(`/odpsites/${createdOdpId}`);
    expect(res.statusCode).toEqual(404); // 404 jika tidak ditemukan
  });
});