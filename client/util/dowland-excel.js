import TableExport from 'tableexport';
TableExport.prototype.typeConfig.date.assert = function (value) { return false; };

const tbOptions = {
  formats: ["xlsx"],    // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
  bootstrap: true,                   // (Boolean), style buttons using bootstrap, (default: true)
  exportButtons: false,                // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
  position: "bottom",                 // (top, bottom), position of the caption element relative to table, (default: 'bottom')
}

DowlandExcel = (key) => {
  const table = TableExport(document.getElementById(key), tbOptions);
  var exportData = table.getExportData();
  var xlsxData = exportData[key].xlsx;
  table.export2file(xlsxData.data, xlsxData.mimeType, xlsxData.filename, xlsxData.fileExtension, xlsxData.merges, xlsxData.RTL, xlsxData.sheetname)
}

DowlandExcelMultiTable = (keys) => {

  const tables = []
  const xlsxDatas = []
  keys.forEach(key => {
    const selector = document.getElementById(key);
    if (selector) {
      const table = TableExport(selector, tbOptions);
      tables.push(table);
      xlsxDatas.push(table.getExportData()[key].xlsx)
    }
  });

  const mergeXlsxData = {
    RTL: false,
    data: [],
    fileExtension: ".xlsx",
    filename: 'rapor',
    merges: [],
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    sheetname: "Rapor"
  }
  for (let i = 0; i < xlsxDatas.length; i++) {
    const xlsxData = xlsxDatas[i];
    mergeXlsxData.data.push(...xlsxData.data)

    xlsxData.merges = xlsxData.merges.map(merge => {
      const diff = mergeXlsxData.data.length - xlsxData.data.length;

      merge.e.r += diff;
      merge.s.r += diff;

      return merge
    });
    mergeXlsxData.merges.push(...xlsxData.merges)
    mergeXlsxData.data.push([null]);
  }
  tables[0].export2file(mergeXlsxData.data, mergeXlsxData.mimeType, mergeXlsxData.filename, mergeXlsxData.fileExtension, mergeXlsxData.merges, mergeXlsxData.RTL, mergeXlsxData.sheetname)
} 