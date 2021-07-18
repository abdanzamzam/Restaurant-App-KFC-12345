const { History, Food } = require("../models");

async function createHistory(data) {
  await History.create({
    entityId: data.id,
    name: data.name,
    description: `New entity with (id: ${data.id}) created`,
    updatedBy: data.authorId,
  });
}

async function putHistory(data) {
  const dataUpdate = await History.create({
    entityId: data.id,
    name: data.name,
    description: `Entity with (id: ${data.id}) updated`,
    updatedBy: data.authorId,
  });
}

async function patchHistory(data, lastStatus) {
  await History.create({
    entityId: data.id,
    name: data.name,
    description: `Entity with (id: ${data.id}) status has been updated from ${data.status} into ${lastStatus}`,
    updatedBy: data.authorId,
  });
}

async function deleteHistory(data) {
  await History.create({
    entityId: data.id,
    name: data.name,
    description: `Entity with (id: ${data.id}) permanently deleted`,
    updatedBy: data.authorId,
  });
}

module.exports = {
  createHistory,
  deleteHistory,
  putHistory,
  patchHistory,
};
