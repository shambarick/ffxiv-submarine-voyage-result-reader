const MachinaFFXIV = require('./node-machina-ffxiv');
const Machina = new MachinaFFXIV({
    monitorType: 'WinPCap',
});
const MachinaModels = require('./node-machina-ffxiv/models/_MachinaModels.js');

Machina.start(() => {
    console.log("Machina started!");
});

function getUint8(uint8Array, offset) {
    if (typeof offset === 'undefined') throw "Parameter 'offset' not provided.";

    let buffer = new DataView(new ArrayBuffer(1));
    for (let i = 0; i < 1; i++) {
        buffer.setUint8(i, uint8Array[offset + i]);
    }
    return buffer.getInt8(0, true);
}


function getSurv(i) {
    const surv = [
        "Seas clear and calm.",
        "Experiencing strong currents. Submersible surveillance levels unaffected, but exploratory capability may be slightly hindered.",
        "Nearby volcanic activity detected.",
        "No prevailing currents detected.",
        "Experiencing strong currents. Submersible surveillance levels normal, but exploratory capability may be significantly hindered.",
        "Submersible surveillance dropping. Continuing exploration until rendered unable.",
    ];
  return surv[i - 4];
}

function getRet(i) {
    const ret = [
        "Optimal retrieval result in excellent retrieval yield.",
        "Normal retrieval  result in average retrieval yield.",
        "Poor retrieval  result in disappointing retrieval yield.",
    ];
    return ret[i - 14];
}

function getFavor(i) {
    const favor = [
        "Additional anomalies detected. Continuing exploration.",
        "Additional anomalies detected. However, current submersible condition found insufficient for further exploration. Setting course to next destination.",
        "No additional anomalies detected in the sector.",
    ]
    return favor[i - 18];
}

const DESTINATION_DATA_LENGTH = 56

Machina.on('raw', (content) => {
    if (content.opcode === 442) {
        const data = content.data;
        for (let i = 0; i < 4; i++) {
            console.log('************');
            console.log(`Destination ${i + 1}`);
            console.log('************');
            console.log(`sectorID: ${getUint8(data, 0x04 + (i * DESTINATION_DATA_LENGTH))}`);
            console.log(`exp: ${MachinaModels.getUint32(data, 0x10 + (i * DESTINATION_DATA_LENGTH))}`);
            console.log(`favor result: ${getFavor(MachinaModels.getUint32(data, 0x0C + (i * DESTINATION_DATA_LENGTH)))}`);
            console.log('----');
            console.log(`loot 1 ID: ${MachinaModels.getUint32(data, 0x14 + (i * DESTINATION_DATA_LENGTH))}`);
            console.log(`loot 1 QTY: ${getUint8(data, 0x1C + (i * DESTINATION_DATA_LENGTH))}`);
            console.log(`loot 1 surv result: ${getSurv(MachinaModels.getUint32(data, 0x24 + (i * DESTINATION_DATA_LENGTH)))}`);
            console.log(`loot 1 ret result: ${getRet(MachinaModels.getUint32(data, 0x2C + (i * DESTINATION_DATA_LENGTH)))}`);
            console.log(`loot 1 item quality: ${MachinaModels.getUint32(data, 0x34 + (i * DESTINATION_DATA_LENGTH))}`);
            console.log('----');
            console.log(`loot 2 ID: ${MachinaModels.getUint32(data, 0x18 + (i * DESTINATION_DATA_LENGTH))}`);
            console.log(`loot 2 QTY: ${getUint8(data, 0x1E + (i * DESTINATION_DATA_LENGTH))}`);
            console.log(`loot 2 surv result: ${getSurv(MachinaModels.getUint32(data, 0x28 + (i * DESTINATION_DATA_LENGTH)))}`);
            console.log(`loot 2 ret result: ${getRet(MachinaModels.getUint32(data, 0x30 + (i * DESTINATION_DATA_LENGTH)))}`);
            console.log(`loot 2 item quality: ${MachinaModels.getUint32(data, 0x38 + (i * DESTINATION_DATA_LENGTH))}`);
        }
        console.log('+++++++++++++++++++++++++++++++++++++');
    }
});
