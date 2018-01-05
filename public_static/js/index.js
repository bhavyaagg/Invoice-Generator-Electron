/**
 * Created by bhavyaagg on 29/12/17.
 */

$(document).ready(function () {

  const {ipcRenderer} = require('electron');

  const $invoicesButton = $('#invoicesButton')
    , $partyMasterButton = $('#partyMasterButton')
    , $productButton = $('#productButton')
    , $ledgerButton = $('#ledgerButton')
    , $subHeader = $('#subHeader')
    , $mainContent = $('#mainContent')
    , $resultRow = $('#resultRow');

  const $editProductCategoryModal = $('#editProductCategoryModal');
  const $editProductModal = $('#editProductModal');
  const $addPaymentModal = $('#addPaymentModal');

  const $editProductCategorySubmit = $('#editProductCategorySubmit');
  const $editProductSubmit = $('#editProductSubmit');
  const $addPaymentSubmit = $('#addPaymentSubmit');

  const $editProductCategoryName = $('#editProductCategoryName');
  const $editProductName = $('#editProductName');
  const $editProductPrice = $('#editProductPrice');
  const $editProductCategoryForProductList = $('#editProductCategoryForProductList');
  const $addPaymentDescription = $('#addPaymentDescription');
  const $addPaymentDate = $('#addPaymentDate');
  const $addPaymentAmount = $('#addPaymentAmount');

  const $editProductCategoryError = $('#editProductCategoryError');
  const $editProductError = $('#editProductError');
  const $addPaymentError = $('#addPaymentError');

  $invoicesButton.click(function () {
    $subHeader.empty();
    $mainContent.empty();
    $resultRow.empty();
    $subHeader.append(`
      <div class="col text-center">
        <button id="addInvoiceButton" class="btn btn-primary">Add Invoice</button>
      </div>
      <div class="col text-center">
        <button id="viewInvoicesButton" class="btn btn-primary">View Invoices</button>
      </div>
    `);

    $('#addInvoiceButton').click(function () {
      $mainContent.empty();
      $resultRow.empty();

      $mainContent.append(`
        <div class="row">
          <div class="col text-center">
            <h3>XYZ Company</h3>
            <h6>Rough Estimate</h6>
          </div>
        </div>
        
        <div class="row">
          
          <div class="col-4">
            <div class="form-group row">
              <label for="partyMasterList" class="col-6 col-form-label">Party Name: </label>
              <select id="partyMasterList" class="custom-select">
                <option name="partyMasterList" value="0">None</option>
              </select>
            </div> 
          </div>
          <div class="col-4 text-center mt-2" id="slipNo" >
            Slip No.:   
          </div>
          <div class="col-4">
            <div class="form-group row">
              <label for="invoiceDate" class="col col-form-label">Date</label>
              <div class="col-8">
                <input class="form-control" type="date" id="invoiceDate">
              </div>  
            </div> 
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-2" id="marka">
            Marka:    
          </div>
          <div class="col-3">
            <div class="form-group row align-items-center">
              <label for="cases" class="col col-form-label">Cases</label>
              <div class="col">
                <input class="form-control" type="number" value="0" id="casesInp">
              </div>
            </div>
          </div>
          <div class="col-3" id="transport">
            Transport:    
          </div>
          <div class="col-4">
            <div class="form-group row align-items-center">
              <label for="productCategoriesList" class="col col-form-label">Product Category: </label>
              <div class="col">
                <select id="productCategoriesList" class="custom-select">
                  <option name="productCategoriesList" value="0">None</option>
                </select>
              </div>
            </div>
          </div>
        </div>  
        <div class="row align-items-center">
          <div class="col-2">
            <div class="form-group row align-items-center">
              <label for="bilityNumber" class="col col-form-label">Bilty No.</label>
              <div class="col">
                <input class="form-control" type="number" value="0" id="bilityNumber">
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group row align-items-center">
              <label for="bilityDate" class="col col-form-label">BiltyDate</label>
              <div class="col">
                <input class="form-control" type="date" id="bilityDate">
              </div>  
            </div>    
          </div>
          <div class="col-2">
            <div class="form-group row align-items-center">
              <label for="chalanNumber" class="col col-form-label text-right">Chalan No.</label>
              <div class="col">
                <input class="form-control" type="number" value="0" id="chalanNumber">
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group row align-items-center">
              <label for="chalanDate" class="col col-form-label">Chalan Date</label>
              <div class="col">
                <input class="form-control" type="date" id="chalanDate">
              </div>  
            </div>    
          </div>
        </div>
        <input class="btn btn-primary" type="submit" value="Add Invoice Item" id="addInvoiceItemBtn">
        <input class="btn btn-primary" type="submit" value="Add Packing Charges" id="addPackingChargesBtn">
        
        <ul class="list-group text-center" id="invoiceItemList">
          <li class="list-group-item">
            <div class="row">
              <div class="col-1">
                <b>S.No.</b>
              </div>
              <div class="col-5">
                <b>Description of Goods</b>
              </div>
              <div class="col-1">
                <b>Qty</b>
              </div>
              <div class="col-2">
                <b>Rate</b>
              </div>
              <div class="col-1">
                <b>Per</b>
              </div>
              <div class="col-2">
                <b>Amt</b>
              </div>
            </div>
          </li>
        </ul>
        <div class="row">
          <div class="col-12" id="totalAmt">
            
          </div>  
        </div>
        
        <div class="row" id="submitBtnDiv">
          <div class="col-5"><b>Checker</b></div>
          <div class="col-2">
            <input class="btn btn-primary" type="submit" value="Submit Invoice" id="submitInvoice">
            <input class="btn btn-primary" type="submit" value="Print Invoice" id="printInvoice">
          </div>
          <div class="col-5"></div>
        </div>
        
      `);

      let $marka = $('#marka');
      let $cases = $('#casesInp');
      let $transport = $('#transport');
      let $invoiceDate = $('#invoiceDate');
      let $bilityNumber = $('#bilityNumber');
      let $bilityDate = $('#bilityDate');
      let $chalanNumber = $('#chalanNumber');
      let $chalanDate = $('#chalanDate');

      let currentDate = getCurrentDate();
      $invoiceDate.val(currentDate);
      $bilityDate.val(currentDate);
      $chalanDate.val(currentDate);
      let $partyMasterList = $('#partyMasterList');
      let $productCategoryList = $('#productCategoriesList');
      let partyMasterRowObj = {};                    // All data with S.no. as key


      let grandTotal = 0;
      let products;
      let cdDiscount;
      // Get data in party Master Dropdown
      ipcRenderer.send('viewPartyMaster');
      ipcRenderer.once('getPartyMaster', function (event, data) {
        if (data.success) {

          if (data.partyMasterRows.length === 0) {
            $mainContent.empty();
            $resultRow.empty();
            $resultRow.removeClass('text-success').addClass('text-danger');
            $resultRow.text("Add a party master First.");
            return;
          }


          let str = `
            
          `;

          data.partyMasterRows.forEach(function (row) {
            partyMasterRowObj[row.id] = row;
            str += `
              <option name="partyMasterList" value="${row.id}">${row.name}</option>
            `;
          });

          $partyMasterList.append(str);
        }
        else {
          $resultRow.removeClass('text-success').addClass('text-danger');
          $resultRow.text("Error is" + data.error);
        }

      });

      let slipNumber = 1;
      let $slipNumber = $('#slipNo');

      ipcRenderer.send('viewInvoiceItems');
      ipcRenderer.once('getInvoiceItems', function (event, data) {
        if (!data.success || typeof data.invoiceItems === "undefined" || data.invoiceItems.length === 0) {
          slipNumber = 1;
          $slipNumber.append(slipNumber);
          return;
        }

        slipNumber = data.invoiceItems[data.invoiceItems.length - 1].id + 1;
        $slipNumber.append(slipNumber);

      });

      //Get Data in Product Categories DropDown
      let productCategoriesRowObj = getDataProductCategories(); // All product Categories with id as key


      // On change for party master list
      let selectedPartyMaster;
      let selectedProductCategory;

      $partyMasterList.change(function () {
        if ($partyMasterList.val() === 0)   // Check for none in list
          return;
        console.log(partyMasterRowObj[$partyMasterList.val()]);
        selectedPartyMaster = partyMasterRowObj[$partyMasterList.val()];

        $marka.empty();
        $marka.append(`Marka: ${selectedPartyMaster.marka}`);

        $transport.empty();
        $transport.append(`Transport: ` + selectedPartyMaster.transport);
        console.log($partyMasterList.val());
        if ($productCategoryList.val() != 0 && $partyMasterList.val() != 0) {
          //console.log('in partMaster');
          //console.log($productCategoryList.val() + ' '+ $partyMasterList.val());
          ipcRenderer.send('viewDiscountByPartyMasterIdAndProductCategoryId', {
            partymasterId: +(selectedPartyMaster.id),
            productcategoryId: +(selectedProductCategory.id)
          });

          ipcRenderer.once('getDiscountByPartyMasterIdAndProductCategoryId', function (event, data) {
            console.log(selectedPartyMaster.id + ' ' + selectedProductCategory.id);
            console.log(data);
            if (data && data.success) {
              console.log(data.discountObj.discount + data.discountObj.splDiscount);
              selectedPartyMaster.discount = data.discountObj.discount;
              selectedPartyMaster.splDiscount = data.discountObj.splDiscount;
            }
          })
        }
      });

      $productCategoryList.change(function () {
        if (+($productCategoryList.val()) === 0)
          return;

        selectedProductCategory = productCategoriesRowObj[$productCategoryList.val()];

        ipcRenderer.send('viewProductByPCategoryId', selectedProductCategory);
        ipcRenderer.once('getProductByPCategoryId', function (event, productList) {

          console.log('productList' + productList.success);

          if (!productList.success || productList.product.length === 0) {
            $mainContent.empty();
            $resultRow.empty();
            $resultRow.removeClass('text-success').addClass('text-danger');
            $resultRow.text("No product or some error");
            return;
          }

          productList.product.forEach(function (row) {
            console.log(row.name)
          })
          products = productList.product;

          let str = '';
          //console.log(products);


          $('#productList').empty();

          products.forEach(product => {
            productObj[product.id] = product;
            str += `<option name="productList" value="${product.id}">${product.name}</option>`
          });

          $('#productList').append(str);
        });

        if ($productCategoryList.val() != 0 && $partyMasterList.val() != 0) {
          //console.log('in product category');
          //console.log($productCategoryList.val() + ' '+ $partyMasterList.val());
          ipcRenderer.send('viewDiscountByPartyMasterIdAndProductCategoryId', {
            partymasterId: +(selectedPartyMaster.id),
            productcategoryId: +(selectedProductCategory.id)
          });

          ipcRenderer.once('getDiscountByPartyMasterIdAndProductCategoryId', function (event, data) {
            console.log(selectedPartyMaster.id + ' ' + selectedProductCategory.id);
            console.log(data);
            if (data && data.success) {
              console.log(data.discountObj.discount + data.discountObj.splDiscount);
              selectedPartyMaster.discount = data.discountObj.discount;
              selectedPartyMaster.splDiscount = data.discountObj.splDiscount;
            }
          })
        }

      });

      let listItemCount = 1;
      let $invoiceItemList = $('#invoiceItemList');
      let productObj = {};

      let packingCharges = 0;
      let $productList = $('#productList');
      let $addInvoiceItemSubmit = $('#addInvoiceItemSubmit');

      let totalAmt = 0;

      $('#addInvoiceItemBtn').click(function () {
        if (selectedPartyMaster === undefined || $productCategoryList.val() === 0) {

          $resultRow.removeClass('text-success').addClass('text-danger');
          $resultRow.text("Select Part Master and/OR product Category");
          return;
        }

        $resultRow.empty();
        $('#addInvoiceItemModal').modal('show');


      })

      $('#addPackingChargesBtn').click(function () {
        $('#addPackingChargesModal').modal('show');
      });

      $('#addPackingChargesSubmit').click(function () {

        let pcharges = $('#packingCharges').val();
        if (pcharges == "")
          return;
        let prevPackingCharges = packingCharges;
        packingCharges = pcharges;
        grandTotal = (+grandTotal) + (+packingCharges) - (+prevPackingCharges);
        updateAmtDiv();
        $('#addPackingChargesModal').modal('hide');
      });
      let invoiceListItems = [];
      $addInvoiceItemSubmit.click(function (e) {

        let qty = $('#qty').val();
        let selectedProduct = productObj[+($productList.val())];
        let per = $('#per').val();
        per = $(`option[name="unitType"][value="${per}"]`).text();

        if (qty <= 0 || typeof selectedProduct === "undefined")
          return;
        invoiceListItems.push({
          itemNumber: listItemCount,
          qty: qty,
          productId: selectedProduct.id,
          per: per
        });
        $invoiceItemList.append(`
            <li class="list-group-item" id="amountCalcList" >
              <div class="row">
                <div class="col-1">
                  ${listItemCount++}
                </div>
                <div class="col-5">
                  ${selectedProduct.name}
                </div>
                <div class="col-1">
                  ${qty}
                </div>
                <div class="col-2" id="productPrice">
                  ${selectedProduct.price}
                </div>
                <div class="col-1"> 
                  ${per}  
                </div>
                <div class="col-2">
                  ${(((+qty) * (+selectedProduct.price)) * (100 - (+selectedPartyMaster.discount)) * (100 - selectedPartyMaster.splDiscount)) / 10000}
                </div>
              </div>
            </li>
          `)
        totalAmt += (((+qty) * (+selectedProduct.price)) * (100 - (+selectedPartyMaster.discount)) * (100 - selectedPartyMaster.splDiscount)) / 10000;

        cdDiscount = totalAmt * +(selectedPartyMaster.cd) / 100;

        grandTotal = totalAmt - (+cdDiscount) + +(packingCharges);
        grandTotal = roundTo(grandTotal, 2);
        updateAmtDiv();
        $('#addInvoiceItemModal').modal('hide');
      });

      $('#printInvoice').click(function () {
        let mainContent = $('#mainContent')[0];
        $(document.body).empty().append(mainContent)
        ipcRenderer.send('printInvoice', {
          id: slipNumber
        })
      });
      $('#submitInvoice').click(function () {
        console.log($cases);
        console.log($bilityDate.val());
        console.log(selectedPartyMaster)
        console.log(selectedProductCategory)
        if (listItemCount === 1)
          return;
        console.log($bilityDate.val());
        console.log($chalanDate.val());
        ipcRenderer.send('submitInvoice', {
          cases: String($cases.val()),
          dateOfInvoice: $invoiceDate.val(),
          bilityNo: $bilityNumber.val(),
          bilityDate: $bilityDate.val(),
          chalanNo: $chalanNumber.val(),
          chalanDate: $chalanDate.val(),
          partymasterId: selectedPartyMaster.id,
          partyMasterBalance: selectedPartyMaster.balance,
          productcategoryId: selectedProductCategory.id,
          productCategoryName: selectedProductCategory.name,
          grandTotal: grandTotal
        });


        ipcRenderer.once('getSubmitInvoice', function (event, data) {
          if (data.success) {
            let mainContent = $('#mainContent')[0];
            $(document.body).empty().append(mainContent);
            ipcRenderer.send('printInvoice', {
              id: slipNumber
            });
            ipcRenderer.once('printedInvoice', function (event, data) {
              if (data.success) {
                location.reload();
              } else {
                window.alert("Could not add invoice");
                $('#resultRow').removeClass('text-success').addClass('text-danger');
                $('#resultRow').text("Invoice Could Not Be Added");
                $mainContent.empty();
              }
            })

          } else {
            $resultRow.removeClass('text-success').addClass('text-danger');
            $resultRow.text("Invoice Could Not Be Added Because " + data.error);
          }
        });
        ipcRenderer.send('submitInvoiceDetail', {
          invoiceId: slipNumber,
          listItems: invoiceListItems
        })


      });

      function updateAmtDiv() {
        $('#totalAmt').empty();
        $('#totalAmt').append(`
          <div>
            <hr>
            <p class="text-right"><b>Amount:  ${totalAmt}</b></p>
          
            <hr>
            <p class="text-right"><b>Amount:  ${totalAmt - (+cdDiscount)}</b></p>
            <p class="text-right"><b>Packing Charges:  ${packingCharges}</b></p>
            <p class="text-right"><b>Grand Total:  ${grandTotal}</b></p>
          </div>
        `)
      }

    });

    let $viewInvoicesButton = $('#viewInvoicesButton');
    $viewInvoicesButton.click(function () {

      $mainContent.empty();
      $resultRow.empty();


      let invoiceItems = [];
      let str = `
        <ul class="list-group text-center">
          <li class="list-group-item">
            <div class="row">
              
              <div class="col">
                <b>Slip No.</b>
              </div>
              <div class="col">
                <b>Party Name</b>
              </div>
              <div class="col">
                <b>Product Category</b>
              </div>
              <div class="col">
                <b>Cases</b>
              </div>
              <div class="col-1">
                <b>Invoice Date</b>
              </div>
              <div class="col">
                <b>Bility No.</b>
              </div>
              <div class="col-1">
                <b>Bility Date</b>
              </div>
              <div class="col">
                <b>Chalan No.</b>
              </div>
              <div class="col-1">
                <b>Chalan Date</b>
              </div>
              <div class="col-2">
                <b>Grand Total</b>
              </div> 
              <div class="col-1 row">
                <div class="col-6">
                  
                </div>
                <div class="col-6">
                  
                </div>
              </div>
            </div>
          </li>
      `;


      ipcRenderer.send('viewInvoiceItems');
      ipcRenderer.once('getInvoiceItems', function (event, data) {
        if (!data.success || typeof data.invoiceItems === "undefined" || data.invoiceItems.length === 0) {

          $mainContent.empty();
          $resultRow.empty();
          $resultRow.removeClass('text-success').addClass('text-danger');
          $resultRow.text("Add a invoice item First.");
          return;
        }

        invoiceItems = data.invoiceItems;


        console.log(invoiceItems);


        console.log('invoice items' + invoiceItems);
        invoiceItems.forEach(invoiceItem => {
          str += `
          <li class="list-group-item">
            <div class="row">
              <div class="col">
                ${invoiceItem.id}
              </div>
              <div class="col">
                ${invoiceItem.partymaster.dataValues.name}
              </div>
              <div class="col">
                ${invoiceItem.productcategory.dataValues.name}
              </div>
              <div class="col">
                ${invoiceItem.cases}
              </div>
              <div class="col-1">
                ${invoiceItem.dateOfInvoice}
              </div>
              <div class="col">
                ${invoiceItem.bilityNo}
              </div>
              <div class="col-1">
                ${invoiceItem.bilityDate}
              </div>
              <div class="col">
                ${invoiceItem.chalanNo}
              </div>
              <div class="col-1">
                ${invoiceItem.chalanDate}
              </div>
              <div class="col-2">
                ${invoiceItem.grandTotal}
              </div> 
              <div class="col-1 row">
                <div class="col-6">
                  <button class="btn btn-success edit-invoice-item" invoiceItemId=${invoiceItem.id}>EDIT</button>
                </div>
                <div class="col-6">
                  <button class="btn btn-danger delete-invoice-item" invoiceItemId=${invoiceItem.id}>DELETE</button>
                </div>
              </div>
            </div>
          </li>  
        `;
        });

        str += '</ul>';
        //let productCategoryId = +(e.target.getAttribute("productCategoryId"));

        $mainContent.append(str);

        $('.delete-invoice-item').click(function (e) {
          let invoiceItemId = +(e.target.getAttribute("invoiceItemId"));
          let youSure = window.confirm('Are you sure want to delete this');

          if (youSure) {
            ipcRenderer.send('deleteInvoiceItemById', {
              id: invoiceItemId
            });
            ipcRenderer.once('deletedInvoiceItemById', function (event, data) {
              if (data.success) {
                $viewInvoicesButton.click();
                $resultRow.removeClass('text-danger').addClass('text-success');
                $resultRow.text("Invoice Item Has Been Deleted");
              } else {
                $resultRow.removeClass('text-success').addClass('text-danger');
                $resultRow.text("Item Could Not Be Deleted Because " + data.error);
              }
            })
          }
        });

        $('.edit-invoice-item').click(function (e) {
          let invoiceItemId = +(e.target.getAttribute("invoiceItemId"));
          console.log(invoiceItemId);
          ipcRenderer.send('viewInvoiceItemById', {
            id: invoiceItemId
          });

          ipcRenderer.once('getInvoiceItemById', function (event, invoiceItem) {

            console.log(invoiceItem);
            $('#editInvoiceItemModal').modal('show');
          })
        })

      });

      /*
      bilityNo:"0"
      biltyDate:null
      cases:0
      chalanDate:"2017-08-19"
      chalanNo:"0"
      dateOfInvoice:"2018-01-02"
      id:3
      partymasterId:1
      productcategoryId:1
       */

    })


  });

  $partyMasterButton.click(function () {
    $subHeader.empty();
    $mainContent.empty();
    $resultRow.empty();
    $subHeader.append(`
      <div class="col text-center">
        <button id="addPartyMaster" class="btn btn-primary">Add Party Master</button>
      </div>
      <div class="col text-center">
        <button id="viewPartyMaster" class="btn btn-primary">View Party Master</button>
      </div>
    `);

    $('#addPartyMaster').click(function () {

      $mainContent.empty();
      $resultRow.empty();
      $mainContent.append(`
        <div class="form-group row">
          <label for="partyName" class="col-3 col-form-label">Party Name: </label>
          <div class="col-9">
            <input class="form-control" type="text" value="" id="partyName">
          </div>
        </div>
        
        <div class="form-group row">
          <label for="destination" class="col-3 col-form-label">Destination: </label>
          <div class="col-9">
            <input class="form-control" type="text" value="" id="destination">
          </div>
        </div>
        
        <div class="form-group row">
          <label for="marka" class="col-3 col-form-label">Marka: </label>
          <div class="col-9">
            <input class="form-control" type="text" value="" id="marka">
          </div>
        </div>
        
        <div class="form-group row">
          <label for="openingBalance" class="col-3 col-form-label">Opening Balance: </label>
          <div class="col-9">
            <input class="form-control" type="number" id="openingBalance">
          </div>
        </div>
        
        <div class="form-group row">
          <label for="openingBalanceDate" class="col-3 col-form-label">Opening Balance Date: </label>
          <div class="col-9">
            <input class="form-control" type="date"  id="openingBalanceDate">
          </div>
        </div>
        
        <div class="form-group row">
          <label for="transport" class="col-3 col-form-label">Transport: </label>
          <div class="col-9">
            <input class="form-control" type="text" value="" id="transport">
          </div>
        </div>
        
        <div class="form-group row">
          <label for="discount" class="col-3 col-form-label">Discount(%): </label>
          <div class="col-9">
            <input class="form-control" type="number" id="discount">
          </div>
        </div>       
         
        <div class="form-group row">
          <label for="splDiscount" class="col-3 col-form-label">Spl. Discount(%): </label>
          <div class="col-9">
            <input class="form-control" type="number" id="splDiscount">
          </div>
        </div>        
        
        <div class="form-group row">
          <label for="cd" class="col-3 col-form-label">CD(%): </label>
          <div class="col-9">
            <input class="form-control" type="number" id="cd">
          </div>
        </div>   
        <div class="row">
          <div class="col text-center">
            <button id="submitPartyMaster" class="btn btn-primary">Submit</button>
          </div>  
          <div class="col text-center">
            <button id="resetPartyMaster" class="btn btn-danger">Reset</button>
          </div>  
        </div>    
      `)

      $('#submitPartyMaster').click(function () {

        let partyMasterData = {
          name: $('#partyName').val(),
          destination: $('#destination').val(),
          marka: $('#marka').val(),
          openingBalance: +($('#openingBalance').val()),
          openingBalanceDate: $('#openingBalanceDate').val(),
          transport: $('#transport').val(),
          discount: $('#discount').val(),
          splDiscount: $('#splDiscount').val(),
          balance: +($('#openingBalance').val()),
          cd: $('#cd').val()
        };

        if (!partyMasterData.name || !partyMasterData.destination || !partyMasterData.marka
          || partyMasterData.openingBalance === "" || partyMasterData.openingBalanceDate === ""
          || !partyMasterData.transport || !partyMasterData.discount === ""
          || partyMasterData.splDiscount === "" || partyMasterData.cd === "") {
          $resultRow.removeClass('text-success').addClass('text-danger');
          $resultRow.text("Please Provide all the fields");
          // console.log(partyMasterData);
        }

        else {
          $mainContent.empty();

          let str = `
            <ul class="list-group text-center">
              <li class="list-group-item">
                <div class="row">
                  <div class="col-4">
                    <b>Product Category</b>
                  </div>
                  <div class="col-4">
                    <b>Discount</b>
                  </div>
                  <div class="col-4">
                    <b>Spl Discount</b>
                  </div>
                </div>
              </li>
          `;
          ipcRenderer.send('viewProductCategories');
          ipcRenderer.once('getProductCategories', function (event, data) {
            if (data.success) {
              if (data.productCategories.length === 0) {
                $mainContent.empty();
                $resultRow.empty();
                $resultRow.removeClass('text-success').addClass('text-danger');
                $resultRow.text("Add a Product Category First.");
                return;
              }
              data.productCategories.forEach(function (productCategory) {
                str += `
                  <ul class="list-group text-center">
                    <li class="list-group-item">
                      <div class="row productCategoryDiscount" productCategoryId="${productCategory.id}">
                        <div class="col-4">
                          ${productCategory.name}
                        </div>
                        <div class="col-4">
                          <div class="col-8">
                            <input class="form-control" type="number" value="${partyMasterData.discount}" id="discount">
                          </div>
                        </div>
                        <div class="col-4">
                          <div class="col-8">
                            <input class="form-control" type="number" value="${partyMasterData.splDiscount}" id="splDiscount">
                          </div>
                        </div>
                      </div>
                    </li>
                `
              });

              str += `
                </ul>
                 <div class="row">
                  <div class="col text-center">
                    <button id="submitPartyMasterAndDiscounts" class="btn btn-primary">Submit</button>
                  </div>  
                </div>
              `;
              $mainContent.append(str);

              $('#submitPartyMasterAndDiscounts').click(function () {
                let pg = $('.productCategoryDiscount');

                let productCategoryDiscountsList = [];
                ipcRenderer.send('addPartyMaster', partyMasterData);
                ipcRenderer.once('addedPartyMaster', function (event, data) {
                  if (data.success) {
                    pg.each((row, item) => {
                      console.log($(item));

                      let productCategoryId = $(item)[0].getAttribute('productCategoryId');
                      let discount = $($(item)[0].children[1].children[0].children[0]).val();
                      let splDiscount = $($(item)[0].children[2].children[0].children[0]).val();

                      console.log('party master id' + data.partyMasterData.id);
                      productCategoryDiscountsList.push({
                        productcategoryId: productCategoryId,
                        discount: discount,
                        splDiscount: splDiscount,
                        partymasterId: +(data.partyMasterData.id)
                      });



                      //TODO MAKE IT SYNCHRONOUS
                    })
                    $mainContent.empty();
                    ipcRenderer.send('addPartyMasterProductCategoryDiscount', productCategoryDiscountsList);

                    $resultRow.removeClass('text-danger').addClass('text-success');
                    $resultRow.text("Party Has Been Added");
                  }
                  else {
                    $resultRow.removeClass('text-success').addClass('text-danger');
                    $resultRow.text("Party Could Not Be Added Because " + data.error);
                  }
                });


              })

            }
            else {
              $resultRow.removeClass('text-success').addClass('text-danger');
              $resultRow.text("Product Categories Could Not Be Viewed Because " + data.error);
            }
          });


          /* */

          //console.log("ho gya")
          /*$resultRow.removeClass('text-danger').addClass('text-success');
          $resultRow.text("Product Category Has Been Added");*/
        }
      });

      $('#resetPartyMaster').click(function () {

        $('#addPartyMaster').click()

      })

    })

    $('#viewPartyMaster').click(function () {
      $mainContent.empty();
      $resultRow.empty();

      ipcRenderer.send('viewPartyMaster');
      ipcRenderer.once('getPartyMaster', function (event, data) {
        if (data.success) {

          if (data.partyMasterRows.length === 0) {
            $mainContent.empty();
            $resultRow.empty();
            $resultRow.removeClass('text-success').addClass('text-danger');
            $resultRow.text("Add a party master First.");
            return;
          }


          let str = `
            <ul class="list-group text-center">
              <li class="list-group-item">
                <div class="row">
                  <div class="col-1">
                    <b>S.No.</b>
                  </div>
                  <div class="col-2">
                    <b>Part Name</b>
                  </div>
                  <div class="col-1">
                    <b>Destination</b>
                  </div>
                  <div class="col-1">
                    <b>Marka</b>
                  </div>
                  <div class="col-1">
                    <b>Opening Bal.</b>
                  </div>
                  <div class="col-1">
                    <b>Opening Date</b>
                  </div>
                  <div class="col-2">
                    <b>Transport</b>
                  </div>
                  <div class="col-1">
                    <b>Discount</b>
                  </div>
                  <div class="col-1">
                    <b>Spl. Discount</b>
                  </div>
                  <div class="col-1">
                    <b>CD</b>
                  </div>
                  
                </div>
              </li>
          `;

          data.partyMasterRows.forEach(function (row) {
            str += `
            <ul class="list-group text-center">
              <li class="list-group-item">
                <div class="row">
                  <div class="col-1">
                    ${row.id}
                  </div>
                  <div class="col-2">
                    ${row.name}
                  </div>
                  <div class="col-1">
                    ${row.destination}
                  </div>
                  <div class="col-1">
                    ${row.marka}
                  </div>
                  <div class="col-1">
                    ${row.openingBalance}
                  </div>
                  <div class="col-1">
                    ${row.openingBalanceDate}
                  </div>
                  <div class="col-2">
                    ${row.transport}
                  </div>
                  <div class="col-1">
                    ${row.discount}
                  </div>
                  <div class="col-1">
                    ${row.splDiscount}
                  </div>
                  <div class="col-1">
                    ${row.cd}
                  </div>
                  
                </div>
              </li>
          `;
          });
          str += "</ul>"

          $mainContent.append(str);


        }
        else {
          $resultRow.removeClass('text-success').addClass('text-danger');
          $resultRow.text("Error is" + data.error);
        }
      });

    })

  });

  $productButton.click(function () {
    $subHeader.empty();
    $mainContent.empty();
    $resultRow.empty();
    $subHeader.append(`
      <div class="col text-center">
        <button id="addProductButton" class="btn btn-primary">Add Product</button>
      </div>
      <div class="col text-center">
        <button id="viewProductsButton" class="btn btn-primary">View Products</button>
      </div>
      <div class="col text-center">
        <button id="addProductCategoryButton" class="btn btn-primary">Add Product Category</button>
      </div>
      <div class="col text-center">
        <button id="viewProductCategoriesButton" class="btn btn-primary">View Product Categories</button>
      </div>
    `);

    const $addProductButton = $('#addProductButton');
    const $viewProductsButton = $('#viewProductsButton');
    const $addProductCategoryButton = $('#addProductCategoryButton');
    const $viewProductCategoriesButton = $('#viewProductCategoriesButton');

    $addProductButton.click(function () {
      $mainContent.empty();
      $resultRow.empty();
      $mainContent.append(`
        <div class="form-group row">
          <label for="productName" class="col-3 col-form-label">Product Name: </label>
          <div class="col-9">
            <input id="productName" class="form-control" type="text" placeholder="Enter Product Name">
          </div>
        </div>
        <div class="form-group row">
          <label for="productPrice" class="col-3 col-form-label">Product Price: </label>
          <div class="col-9">
            <input id="productPrice" class="form-control" type="number" placeholder="Enter Product Price">
          </div>
        </div>
        <div class="form-group row">
          <label for="productCategoriesList" class="col-3 col-form-label">Select Product Category: </label>
          <div class="col-9">
            <select id="productCategoriesList" class="custom-select">
              <option name="productCategoriesList" value="0">None</option>
            </select>
          </div>
        </div>
        <br/>
        <div class="row">
          <div class="col text-center">
            <button id="submitProduct" class="btn btn-success">Submit</button>
          </div>
          <div class="col text-center">
            <button id="resetProduct" class="btn btn-danger">Reset</button>
          </div>
        </div>
      `);

      ipcRenderer.send('viewProductCategories');
      ipcRenderer.once('getProductCategories', function (event, data) {
        if (data.success) {
          let str = "";
          if (data.productCategories.length === 0) {
            $mainContent.empty();
            $resultRow.empty();
            $resultRow.removeClass('text-success').addClass('text-danger');
            $resultRow.text("Add a Product Category First.");
            return;
          }
          data.productCategories.forEach(function (productCategory) {
            str += `<option name="productCategoriesList" value="${productCategory.id}">${productCategory.name}</option>`
          });

          $('#productCategoriesList').append(str);
        } else {
          $resultRow.removeClass('text-success').addClass('text-danger');
          $resultRow.text("Product Categories Could Not Be Viewed Because " + data.error);
        }
      });


      const $submitProduct = $('#submitProduct');
      const $resetProduct = $('#resetProduct');

      $submitProduct.click(function () {
        let productName = $('#productName').val();
        let productPrice = +($('#productPrice').val());
        let productCategoryId = +($('#productCategoriesList').val());

        if (!productName || !productPrice || productCategoryId === 0) {
          $resultRow.removeClass('text-success').addClass('text-danger');
          $resultRow.text("Please Provide All The Details For The Product.");
        } else {
          ipcRenderer.send('addProduct', {
            productName: productName,
            productPrice: productPrice,
            productCategoryId: productCategoryId
          });
          ipcRenderer.once('addedProduct', function (event, data) {
            $mainContent.empty();
            $resultRow.empty();
            if (data.success) {
              $resultRow.removeClass('text-danger').addClass('text-success');
              $resultRow.text("Product Has Been Added");
            } else {
              $resultRow.removeClass('text-success').addClass('text-danger');
              $resultRow.text("Product Could Not Be Added Because " + data.error);
            }
          })
        }
      });
      $resetProduct.click(function () {
        $('#productName').val("");
        $('#productPrice').val("");
        $('option[value=0][name="productCategoriesList"]').attr('selected', true);
        $resultRow.empty();
      })
    });

    $viewProductsButton.click(function () {
      ipcRenderer.send('viewProducts');
      ipcRenderer.once('getProducts', function (event, data) {
        $mainContent.empty();
        $resultRow.empty();
        if (data.success) {
          let str = `
            <ul class="list-group text-center">
              <li class="list-group-item">
                <div class="row align-items-center">
                  <div class="col-3">
                    <b>Product Name</b>
                  </div>
                  <div class="col-3">
                    <b>Product Price</b>
                  </div>
                  <div class="col-3">
                    <b>Product Category</b>
                  </div>
                </div>
              </li>
          `;

          data.products.forEach(function (product) {
            str += `
            <li class="list-group-item">
              <div class="row align-items-center">
                <div class="col-3">
                  ${product.name}
                </div>
                <div class="col-3">
                  ${product.price}
                </div>
                <div class="col-3">
                  ${product.productcategory.name}
                </div>
                <div class="col">
                    <button class="btn btn-success edit-product" productId=${product.id}>EDIT</button>
                </div>
                <div class="col">
                  <button class="btn btn-danger delete-product" productId=${product.id}>DELETE</button>
                </div>
              </div>
            </li>
            `
          });
          str += "</ul>"

          $mainContent.append(str);

          $('.edit-product').click(function (e) {
            let productId = +(e.target.getAttribute("productId"));
            ipcRenderer.send('viewProductById', {
              id: productId
            });


            ipcRenderer.once('getProductById', function (event, productData) {
              if (data.success) {

                ipcRenderer.send('viewProductCategories');

                ipcRenderer.once('getProductCategories', function (event, data) {
                  if (data.success) {
                    $editProductCategoryForProductList.empty();
                    let str = "";
                    if (data.productCategories.length === 0) {
                      $editProductError.text('No product Categories Exists');
                      return;
                    }
                    data.productCategories.forEach(function (productCategory) {
                      str += `<option name="editProductCategoryForProductList" value="${productCategory.id}">${productCategory.name}</option>`
                    });

                    $editProductCategoryForProductList.append(str);

                    $editProductName.val(productData.product.name);
                    $editProductPrice.val(productData.product.price);
                    $editProductCategoryForProductList.val(productData.product.productcategoryId);
                    $editProductSubmit[0].setAttribute('productId', productId);
                    $resultRow.empty();
                    $editProductModal.modal('show');

                  } else {
                    $resultRow.removeClass('text-success').addClass('text-danger');
                    $resultRow.text("Product Categories Could Not Be Viewed Because " + data.error);
                  }
                });

              } else {
                $resultRow.removeClass('text-success').addClass('text-danger');
                $resultRow.text("Product Could Not Be Edited Because " + data.error);
              }
            });
          });

          $('.delete-product').click(function (e) {
            let productId = +(e.target.getAttribute("productId"));
            let youSure = window.confirm('Are you sure want to delete this');

            if (youSure) {
              ipcRenderer.send('deleteProductById', {
                id: productId
              });
              ipcRenderer.once('deletedProductById', function (event, data) {
                if (data.success) {
                  $viewProductsButton.click();
                  $resultRow.removeClass('text-danger').addClass('text-success');
                  $resultRow.text("Product Has Been Deleted");
                } else {
                  $resultRow.removeClass('text-success').addClass('text-danger');
                  $resultRow.text("Product Could Not Be Deleted Because " + data.error);
                }
              })
            }
          });
        } else {
          $resultRow.removeClass('text-success').addClass('text-danger');
          $resultRow.text("Products Could Not Be Viewed Because " + data.error);
        }
      });
    });

    $addProductCategoryButton.click(function () {
      $mainContent.empty();
      $resultRow.empty();
      $mainContent.append(`
        <div class="form-group row">
          <label for="productCategoryName" class="col-4 col-form-label">Product Category Name: </label>
          <div class="col-8">
            <input id="productCategoryName" class="form-control" type="text" placeholder="Enter Product Category Name">
          </div>
        </div>
        <br/>
        <div class="row">
          <div class="col text-center">
            <button id="submitProductCategory" class="btn btn-success">Submit</button>
          </div>
          <div class="col text-center">
            <button id="resetProductCategory" class="btn btn-danger">Reset</button>
          </div>
        </div>
      `);

      const $submitProductCategory = $('#submitProductCategory');
      const $resetProductCategory = $('#resetProductCategory');

      $submitProductCategory.click(function () {
        let productCategoryName = $('#productCategoryName').val();
        if (!productCategoryName) {
          $resultRow.removeClass('text-success').addClass('text-danger');
          $resultRow.text("Please Provide the Product Category Name.");
        } else {
          ipcRenderer.send('addProductCategory', {
            productCategoryName: productCategoryName
          });
          ipcRenderer.once('addedProductCategory', function (event, data) {
            $mainContent.empty();
            $resultRow.empty();
            if (data.success) {
              $resultRow.removeClass('text-danger').addClass('text-success');
              $resultRow.text("Product Category Has Been Added");
            } else {
              $resultRow.removeClass('text-success').addClass('text-danger');
              $resultRow.text("Product Categories Could Not Be Added Because " + data.error);
            }
          })
        }
      });

      $resetProductCategory.click(function () {
        $('#productCategoryName').val("");
      })
    });

    $viewProductCategoriesButton.click(function () {
      ipcRenderer.send('viewProductCategories');
      ipcRenderer.once('getProductCategories', function (event, data) {
        $mainContent.empty();
        if (data.success) {
          let str = `
            <ul class="list-group text-center">
              <li class="list-group-item">
                <div class="row align-items-center">
                  <div class="col-6">
                    <b>Product Category Name</b>
                  </div>
                  <div class="col">
                  </div>
                  <div class="col">
                  </div>
                </div>
              </li>
          `;

          data.productCategories.forEach(function (productCategory) {
            str += `
            <li class="list-group-item">
              <div class="row align-items-center">
                <div class="col-6">
                  ${productCategory.name}
                </div>
                <div class="col">
                    <button class="btn btn-success edit-product-category" productCategoryId=${productCategory.id}>EDIT</button>
                </div>
                <div class="col">
                  <button class="btn btn-danger delete-product-category" productCategoryId=${productCategory.id}>DELETE</button>
                </div>
              </div>
            </li>
            `
          });
          str += "</ul>";

          $mainContent.append(str);

          $('.edit-product-category').click(function (e) {
            let productCategoryId = +(e.target.getAttribute("productCategoryId"));
            ipcRenderer.send('viewProductCategoryById', {
              id: productCategoryId
            });
            ipcRenderer.once('getProductCategoryById', function (event, data) {
              if (data.success) {
                $editProductCategoryName.val(data.productCategory.name);
                $editProductCategorySubmit[0].setAttribute('productCategoryId', productCategoryId);
                $resultRow.empty();
                $editProductCategoryModal.modal('show');
              } else {
                $resultRow.removeClass('text-success').addClass('text-danger');
                $resultRow.text("Product Category Could Not Be Edited Because " + data.error);
              }
            });
          });

          $('.delete-product-category').click(function (e) {
            let productCategoryId = +(e.target.getAttribute("productCategoryId"));
            let youSure = window.confirm('Are you sure want to delete this');

            if (youSure) {
              ipcRenderer.send('deleteProductCategoryById', {
                id: productCategoryId
              });
              ipcRenderer.once('deletedProductCategoryById', function (event, data) {
                if (data.success) {
                  $viewProductCategoriesButton.click();
                  $resultRow.removeClass('text-danger').addClass('text-success');
                  $resultRow.text("Product Category Has Been Deleted");
                } else {
                  $resultRow.removeClass('text-success').addClass('text-danger');
                  $resultRow.text("Product Category Could Not Be Deleted Because " + data.error);
                }
              })
            }
          });

        } else {
          $resultRow.removeClass('text-success').addClass('text-danger');
          $resultRow.text("Product Category Could Not Be Viewed Because " + data.error);
        }
      });
    })

  });

  $ledgerButton.click(function () {
    $subHeader.empty();
    $mainContent.empty();
    $resultRow.empty();
    $subHeader.append(`
      <div class="col text-center">
        <label for="partyMastersList" class="col-form-label">Party Master Name: &nbsp;&nbsp;</label>
        <select id="partyMastersList" class="custom-select">
          <option name="partyMastersList" value="0">None</option>
        </select>
      </div>
      <div class="col text-center">
        <button id="viewLedger" class="btn btn-primary">View Ledger</button>
      </div>
      <div class="col text-center">
        <button id="addPayment" class="btn btn-primary">Add Payment</button>
      </div>
    `);

    ipcRenderer.send('viewPartyMaster');
    ipcRenderer.once('getPartyMaster', function (event, data) {
      if (data.success) {
        let str = "";
        if (data.partyMasterRows.length === 0) {
          $mainContent.empty();
          $resultRow.empty();
          $resultRow.removeClass('text-success').addClass('text-danger');
          $resultRow.text("Add a Party Master First.");
          return;
        }
        data.partyMasterRows.forEach(function (partyMaster) {
          str += `<option name="partyMastersList" value="${partyMaster.id}">${partyMaster.name}</option>`
        });

        $('#partyMastersList').append(str);
      } else {
        $resultRow.removeClass('text-success').addClass('text-danger');
        console.log(data.error)
        $resultRow.text("Party Masters Could Not Be Viewed Because " + data.error);
      }
    });

    const $viewLedger = $('#viewLedger');
    const $addPayment = $('#addPayment');

    $viewLedger.click(function () {
      let partyMasterId = +($('#partyMastersList').val());

      if (partyMasterId === 0) {
        $resultRow.removeClass('text-success').addClass('text-danger');
        $resultRow.text("Please Select A Party Master");
      } else {
        ipcRenderer.send('viewLedgerByPartyMasterId', {
          id: partyMasterId
        });
        ipcRenderer.once('getLedgerByPartyMasterId', function (event, data) {
          $mainContent.empty();
          $resultRow.empty();
          if (data.success) {
            let str = `
            <ul class="list-group text-center">
              <li class="list-group-item">
                <div class="row align-items-center">
                  <div class="col">
                    Description
                  </div>
                  <div class="col">
                    Date Of Transaction
                  </div>
                  <div class="col">
                    Product Name
                  </div>
                  <div class="col">
                    Debit
                  </div>
                  <div class="col">
                    Credit
                  </div>
                  <div class="col">
                    Balance
                  </div>
                </div>
              </li>
          `;

            data.ledgerRows.forEach(function (ledgerRow) {
              str += `
              <li class="list-group-item">
                <div class="row align-items-center">
                  <div class="col">${ledgerRow.description}</div>
                  <div class="col">${ledgerRow.dateOfTransaction.split('-').reverse().join('-')}</div>
                  <div class="col">${ledgerRow.productCategoryName}</div>
                  <div class="col">${ledgerRow.debit}</div>
                  <div class="col">${ledgerRow.credit}</div>
                  <div class="col">${ledgerRow.balance}</div>
                </div>
              </li>
              `
            });
            str += "</ul>"

            $mainContent.append(str);
          } else {
            $resultRow.removeClass('text-success').addClass('text-danger');
            $resultRow.text("Ledger Could Not Be Viewed Because " + data.error);
          }
        })
      }
    });

    $addPayment.click(function () {
      let partyMasterId = +($('#partyMastersList').val());
      if (partyMasterId === 0) {
        $resultRow.removeClass('text-success').addClass('text-danger');
        $resultRow.text("Please Select A Party Master");
      } else {
        $addPaymentSubmit[0].setAttribute('partyMasterId', partyMasterId);
        $addPaymentModal.modal('show');
      }
    });

    $addPaymentSubmit.click(function (e) {
      let partyMasterId = +(e.target.getAttribute('partyMasterId'));

      let paymentDescription = $addPaymentDescription.val();
      let paymentDate = $addPaymentDate.val();
      let paymentAmount = +($addPaymentAmount.val());

      if (!paymentDescription || !paymentDate || paymentAmount === 0) {
        $addPaymentError.text("Please Enter the All the Details");
      } else {
        ipcRenderer.send('addPaymentForPartyMaster', {
          partyMasterId: partyMasterId,
          description: paymentDescription,
          transactionDate: paymentDate,
          amount: paymentAmount
        });
        ipcRenderer.once('addedPaymentForPartyMaster', function (event, data) {
          if (data.success) {
            $addPaymentModal.modal('hide');
            $ledgerButton.click();
            $resultRow.removeClass('text-danger').addClass('text-success');
            $resultRow.text("Payment Has Been Added");
          } else {
            $resultRow.removeClass('text-success').addClass('text-danger');
            $resultRow.text("Payment Could Not Be Added Because " + data.error);
          }
        })
      }
    })

  });

  $editProductCategorySubmit.click(function (e) {
    let productCategoryId = +(e.target.getAttribute("productCategoryId"));
    let productCategoryName = $editProductCategoryName.val();

    if (productCategoryName === "") {
      $editProductCategoryError.text("Please Enter the Product Category Name");
    } else {
      ipcRenderer.send('editProductCategory', {
        id: productCategoryId,
        name: productCategoryName
      });
      ipcRenderer.once('editedProductCategory', function (event, data) {
        $editProductCategoryModal.modal('hide');
        if (data.success) {
          $('#viewProductCategoriesButton').click();
          $resultRow.removeClass('text-danger').addClass('text-success');
          $resultRow.text("Product Category Has Been Updated");
        } else {
          $resultRow.removeClass('text-success').addClass('text-danger');
          $resultRow.text("Product Category Could Not Be Updated Because " + data.error);
        }
      })
    }
  })

  $editProductSubmit.click(function (e) {
    let productId = +(e.target.getAttribute("productId"));
    let productName = $editProductName.val();
    let productPrice = +($editProductPrice.val());
    let productCategoryId = +($editProductCategoryForProductList.val());

    if (!productName || !productPrice || productCategoryId === 0) {
      $editProductError.text("Please Enter the All the Details");
    } else {
      ipcRenderer.send('editProduct', {
        id: productId,
        name: productName,
        price: productPrice,
        productCategoryId: productCategoryId
      });
      ipcRenderer.once('editedProduct', function (event, data) {
        $editProductModal.modal('hide');
        if (data.success) {
          $('#viewProductsButton').click();
          $resultRow.removeClass('text-danger').addClass('text-success');
          $resultRow.text("Product Has Been Updated");
        } else {
          $resultRow.removeClass('text-success').addClass('text-danger');
          $resultRow.text("Product Could Not Be Updated Because " + data.error);
        }
      })
    }
  })

  function getDataProductCategories() {
    let productCategoriesRowObj = {};
    ipcRenderer.send('viewProductCategories');
    ipcRenderer.once('getProductCategories', function (event, data) {
      if (data.success) {
        let str = "";
        if (data.productCategories.length === 0) {
          $mainContent.empty();
          $resultRow.empty();
          $resultRow.removeClass('text-success').addClass('text-danger');
          $resultRow.text("Add a Product Category First.");
          return;
        }

        data.productCategories.forEach(function (productCategory) {
          productCategoriesRowObj[productCategory.id] = productCategory;
          str += `<option name="productCategoriesList" value="${productCategory.id}">${productCategory.name}</option>`
        });

        $('#productCategoriesList').append(str);

      } else {
        $resultRow.removeClass('text-success').addClass('text-danger');
        $resultRow.text("Product Categories Could Not Be Viewed Because " + data.error);
      }
    });

    return productCategoriesRowObj;
  }

  function getCurrentDate() {
    let today = new Date();
    // console.log(today.toDateString('yyyy-'))
    // let dd = today.getDate();
    // let mm = today.getMonth() + 1; //January is 0!
    // let yyyy = today.getFullYear();
    //
    // if (dd < 10) {
    //   dd = '0' + dd
    // }
    //
    // if (mm < 10) {
    //   mm = '0' + mm
    // }
    //
    // today = yyyy + '-' + mm + '-' + dd;
    // console.log(today)

    return today.toISOString().split('T')[0];
  }

  function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
      digits = 0;
    }
    if (n < 0) {
      negative = true;
      n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    if (negative) {
      n = (n * -1).toFixed(2);
    }
    return n;
  }

});



