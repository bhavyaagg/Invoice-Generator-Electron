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
            <h3>XYZ</h3>
            <h6>Rough Estimate</h6>
          </div>
        </div>
        
        <div class="row">
          <div class="col-4">
            <div class="form-group row">
              <label for="partyMasterList" class="col-4 col-form-label">Name: </label>
              <select id="partyMasterList" class="custom-select col-8 pr-0">
                <option name="partyMasterList" value="0">None</option>
              </select>
            </div> 
          </div>
          <div class="col-3">
            <div class="form-group row align-items-center">
              <label for="productCategoriesList" class="col-4 pl-0 col-form-label">Product: </label>
              <select id="productCategoriesList" class="custom-select col-7 pr-0">
                <option name="productCategoriesList" value="0">None</option>
              </select>
            </div>
          </div>
          <div class="col-5">
            <div class="form-group row no-gutters align-items-center">
              <div class="col-4">Slip No./Date</div>
              <div class="col-2 pt-2 pb-2 pl-1" id="slipNo"></div>
              <div class="col-6">
                <input class="form-control pr-0 pl-0" type="date" id="invoiceDate">
              </div>  
            </div> 
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-2 mt-2" id="marka">
            Marka:    
          </div>
          <div class="col-5">
            <div class="form-group row align-items-center no-gutters">
              <div class="col-3">GR No/Date</div>
              <div class="col-3">
                <input type="number" value="0" id="bilityNumber" class="form-control pr-0 pl-0" style="padding-left: 0!important;padding-right: 0!important;">
              </div>
              <div class="col-6">
                <input class="form-control pl-0 pr-0" type="date" id="bilityDate">
              </div>  
            </div>
          </div>
          <div class="col-5">
            <div class="form-group row align-items-center no-gutters">
              <div class="col-4">C. No/Date</div>
              <div class="col-2">
                <input class="form-control pr-0 pl-0" type="number" value="0" id="chalanNumber">
              </div>
              <div class="col-6">
                <input class="form-control pl-0 pr-0" type="date" id="chalanDate">
              </div>  
            </div>
          </div>
        </div>  
        
        <div class="row no-gutters">
          <div class="col-3 mt-2" id="destination">
            Destination:    
          </div>
          
          <div class="col-2">
            <div class="form-group row no-gutters">
              <label for="cases" class="col-5 col-form-label">Cases:</label>
              <div class="col-7">
                <input class="form-control pr-0" type="number" value="0" id="casesInp">
              </div>
            </div>
          </div>
          <div class="col-7">
            <div class="form-group row no-gutters">
              <label for="transport" class="col-2 col-form-label">Transport: </label> 
              <div class="col-10">
                <input class="form-control" type="text" value="" id="transport">
              </div>
            </div>
          </div>
          
          
        </div>

        
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
        <div class="row" style="padding-right: 50px;">
          <div class="col-12" id="totalAmt">
            
          </div>  
        </div>
        
        <div class="row" id="submitBtnDiv">
          <div class="col-5"><b></b></div>
          <div class="col-2">
            <input class="btn btn-primary" type="submit" value="Submit Invoice" id="submitInvoice">
          
          </div>
          <div class="col-5">
            <input class="btn btn-primary" type="submit" value="Add Invoice Item" id="addInvoiceItemBtn">
            <input class="btn btn-primary" type="submit" value="Add Packing Charges" id="addPackingChargesBtn">
          </div>
        </div>
        
      `);

      // $('label').css('padding-right', "0");
      $('input').addClass("pl-1").addClass('pr-1');
      $('#mainContent div.form-group').css('margin-bottom', '5px');

      let $marka = $('#marka');
      let $cases = $('#casesInp');
      let $transport = $('#transport');
      let $destination = $('#destination');
      let $invoiceDate = $('#invoiceDate');
      let $bilityNumber = $('#bilityNumber');
      let $bilityDate = $('#bilityDate');
      let $chalanNumber = $('#chalanNumber');
      let $chalanDate = $('#chalanDate');

      let currentDate = getCurrentDate();
      $invoiceDate.val(currentDate);
      // $bilityDate.val(currentDate);
      // $chalanDate.val(currentDate);
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

      let slipNumber;
      let $slipNumber = $('#slipNo');

      /* ipcRenderer.send('viewInvoiceItems');
       ipcRenderer.once('getInvoiceItems', function (event, data) {
         if (!data.success || typeof data.invoiceItems === "undefined" || data.invoiceItems.length === 0) {
           slipNumber = 1;
           $slipNumber.append(slipNumber);
           return;
         }

         slipNumber = data.invoiceItems[data.invoiceItems.length - 1].id + 1;
         $slipNumber.append(slipNumber);

       });
 */
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

        if (selectedPartyMaster) {
          $marka.empty();
          $marka.append(`Marka: ${selectedPartyMaster.marka}`);

          $transport.empty();
          $transport.val(selectedPartyMaster.transport);

          $destination.empty().append('Destination: ' + selectedPartyMaster.destination)
        } else {
          $marka.empty();
          $marka.append(`Marka:`);

          $transport.empty();
          $transport.val("");

          $destination.empty().append('Destination: ')
        }
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

        selectedProductCategory = productCategoriesRowObj[(+$productCategoryList.val())];

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

          // productList.product.forEach(function (row) {
          //   console.log(row.name)
          // })
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
      let qtyCount = 0;
      let $invoiceItemList = $('#invoiceItemList');
      let productObj = {};

      let packingCharges = 0;
      let $productList = $('#productList');
      let $addInvoiceItemSubmit = $('#addInvoiceItemSubmit');

      let totalAmtWithoutDis = 0, totalAmt = 0;

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

        qtyCount += +(qty);
        invoiceListItems.push({
          itemNumber: listItemCount,
          qty: qty,
          productId: selectedProduct.id,
          per: per
        });
        $invoiceItemList.append(`
            <li class="list-group-item" id="amountCalcList" style="padding: 0px">
              <div class="row" padding-top: -5px"> 
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
                  ${(+qty) * (+selectedProduct.price) }
                </div>
              </div>
            </li>
          `)

        totalAmtWithoutDis += +((+qty) * (+selectedProduct.price));
        totalAmt += (((+qty) * (+selectedProduct.price)) * (100 - (+selectedPartyMaster.discount)) * (100 - selectedPartyMaster.splDiscount)) / 10000;

        totalAmt = roundTo(totalAmt, 1);

        cdDiscount = totalAmt * +(selectedPartyMaster.cd) / 100;
        cdDiscount = roundTo(cdDiscount, 1);

        grandTotal = totalAmt - (+cdDiscount) + (+(packingCharges));
        grandTotal = roundTo(grandTotal, 1);
        updateAmtDiv();
        $('#addInvoiceItemModal').modal('hide');
      });

      $('#printInvoice').click(function () {
        let mainContent = $('#mainContent')[0];
        $(document.body).empty().append(mainContent);
        ipcRenderer.send('printInvoice', {
          id: slipNumber
        })
      });
      $('#submitInvoice').click(function () {
        let bilityDate = ($bilityDate.val() ? $bilityDate.val() : null)
        let chalanDate = $chalanDate.val();

        if (listItemCount === 1)
          return;
        console.log($bilityDate.val());
        console.log($chalanDate.val());
        ipcRenderer.send('submitInvoice', {
          cases: String($cases.val()),
          dateOfInvoice: $invoiceDate.val(),
          bilityNo: $bilityNumber.val(),
          bilityDate: bilityDate,
          chalanNo: $chalanNumber.val(),
          chalanDate: chalanDate,
          partymasterId: selectedPartyMaster.id,
          partyMasterBalance: selectedPartyMaster.balance,
          productcategoryId: selectedProductCategory.id,
          productCategoryName: selectedProductCategory.name,
          grandTotal: grandTotal
        });

        if (!bilityDate) {
          $bilityDate.hide();
        }

        if (!chalanDate) {
          $chalanDate.hide();
        }

        ipcRenderer.once('getSubmitInvoice', function (event, data) {
          if (data.success) {
            $('#submitInvoice').hide();
            $('#addInvoiceItemBtn').hide();
            $('#addPackingChargesBtn').hide();
            console.log(data);
            $slipNumber.append(data.invoiceItem.id);
            slipNumber = data.invoiceItem.id;
            let mainContent = $('#mainContent')[0];

            $(document.body).empty().append(mainContent);
            $(document.body).css('padding-top', '0px')

            $('input, select').css('border', 'none');
            $('select').css('background', 'white').css('padding-left', "0");
            $('#mainContent').css('padding', "0px");
            $('*').css('font-size', '12px');

            //$('*').css('padding', "");

            ipcRenderer.send('submitInvoiceDetail', {
              invoiceId: slipNumber,
              listItems: invoiceListItems
            })


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


      });

      function updateAmtDiv() {
        let amtAfterCd = totalAmt - (+cdDiscount);
        amtAfterCd = roundTo(amtAfterCd, 1);
        $('#totalAmt').empty();
        $('#totalAmt').append(`
          <div >
            
            <hr>
              <p class="text-right"><b>Total Qty: ${qtyCount} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Amount:  ${totalAmtWithoutDis}</b></p>
            <hr>
            <p class="text-right">
            
            <b>
              
              Discounted Amount:  ${totalAmt} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
              After CD Amount:  ${amtAfterCd} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
              Packing Charges:  ${packingCharges}
            
            </b>
            </p>
           
            <h5 class="text-right">Grand Total:  ${grandTotal}</h5>
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
              <div class="col-1">
                <b>Grand Total</b>
              </div> 
              <div class="col-2 row">
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

        let invoiceItemObj = {};
        console.log('invoice items' + invoiceItems);
        invoiceItems.forEach(invoiceItem => {
          invoiceItemObj[invoiceItem.id] = invoiceItem;
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
                ${(invoiceItem.bilityDate === null ? "" : invoiceItem.bilityDate)}
              </div>
              <div class="col">
                ${invoiceItem.chalanNo}
              </div>
              <div class="col-1">
                ${invoiceItem.chalanDate}
              </div>
              <div class="col-1">
                ${invoiceItem.grandTotal}
              </div> 
              <div class="col-2 row">
                <div class="col-4">
                  <button class="btn btn-success edit-invoice-item" invoiceItemId=${invoiceItem.id}>EDIT</button>
                </div>
                <div class="col-4">
                  <button class="btn btn-primary printInvoiceAgain" invoiceItemId=${invoiceItem.id}>PRINT</button>
                </div>
                <div class="col-4">
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

        $('.printInvoiceAgain').click(function (e) {

          console.log('print view click');
          let invoiceItemId = +(e.target.getAttribute("invoiceItemId"));
          let invoiceItem = invoiceItemObj[invoiceItemId];
          console.log(invoiceItem);
          $mainContent.empty();
          ipcRenderer.send('viewInvoiceDetailsById', {
            invoiceId: invoiceItemId
          });
          ipcRenderer.once('getInvoiceDetailById', function (event, data) {
            $mainContent.empty();

            $resultRow.empty();

            $mainContent.append(`
              <div class="row">
                <div class="col text-center">
                  <h3>XYZ</h3>
                  <h6>Rough Estimate</h6>
                </div>
              </div>
              
              <div class="row">
                <div class="col-4">
                  <div class="form-group row">
                    <label for="partyMasterList" class="col-4 col-form-label">Name: </label>
                    <select id="partyMasterList" class="custom-select col-8 pr-0">
                      <option name="partyMasterList" value="0">${invoiceItem.partymaster.dataValues.name}</option>
                    </select>
                  </div> 
                </div>
                <div class="col-3">
                  <div class="form-group row align-items-center">
                    <label for="productCategoriesList" class="col-4 pl-0 col-form-label">Product: </label>
                    <select id="productCategoriesList" class="custom-select col-7 pr-0">
                      <option name="productCategoriesList" value="0">${invoiceItem.productcategory.dataValues.name}</option>
                    </select>
                  </div>
                </div>
                <div class="col-5">
                  <div class="form-group row no-gutters align-items-center">
                    <div class="col-4">Slip No./Date</div>
                    <div class="col-2 pt-2 pb-2 pl-1" id="slipNo">${invoiceItem.id}</div>
                    <div class="col-6">
                      <input class="form-control pr-0 pl-0" type="date" id="invoiceDate" value="${invoiceItem.dateOfInvoice}">
                    </div>  
                  </div> 
                </div>
              </div>
              <div class="row no-gutters">
                <div class="col-2 mt-2" id="marka">
                  Marka: ${invoiceItem.partymaster.dataValues.marka}  
                </div>
                <div class="col-5">
                  <div class="form-group row align-items-center no-gutters">
                    <div class="col-3">GR No/Date</div>
                    <div class="col-3">
                      <input type="number" value="${invoiceItem.bilityNo}" id="bilityNumber" class="form-control pr-0 pl-0" style="padding-left: 0!important;padding-right: 0!important;">
                    </div>
                    <div class="col-6">
                      <input class="form-control pl-0 pr-0" value="${invoiceItem.bilityDate}" type="date" id="bilityDate">
                    </div>  
                  </div>
                </div>
                <div class="col-5">
                  <div class="form-group row align-items-center no-gutters">
                    <div class="col-4">C. No/Date</div>
                    <div class="col-2">
                      <input class="form-control pr-0 pl-0" type="number" value="${invoiceItem.chalanNo}" id="chalanNumber">
                    </div>
                    <div class="col-6">
                      <input class="form-control pl-0 pr-0" value="${invoiceItem.chalanDate}" type="date" id="chalanDate">
                    </div>  
                  </div>
                </div>
              </div>  
              
              <div class="row no-gutters">
                <div class="col-3 mt-2" id="destination">
                  Destination: ${invoiceItem.partymaster.dataValues.destination}
                </div>
                
                <div class="col-2">
                  <div class="form-group row no-gutters">
                    <label for="cases" class="col-5 col-form-label">Cases:</label>
                    <div class="col-7">
                      <input class="form-control pr-0" type="number" value="${invoiceItem.cases}" id="casesInp">
                    </div>
                  </div>
                </div>
                <div class="col-7">
                  <div class="form-group row no-gutters">
                    <label for="transport" class="col-2 col-form-label">Transport: </label> 
                    <div class="col-10">
                      <input class="form-control" type="text" value="${invoiceItem.partymaster.dataValues.transport}" id="transport">
                    </div>
                  </div>
                </div>
                
                
              </div>
      
              
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
              <div class="row" style="padding-right: 50px;">
                <div class="col-12" id="totalAmt">
                  
                </div>  
              </div>  
              
              <div class="row" id="submitBtnDiv">
                <div class="col-5"><b></b></div>
                <div class="col-2">
                  <input class="btn btn-primary" type="submit" value="Submit Invoice" id="submitInvoiceAgain">
                
                </div>
                <div class="col-5">
                  <input class="btn btn-primary" type="submit" value="Add Invoice Item" id="addInvoiceItemBtn">
                </div>
              </div>
              
            `);

            console.log(data);

            let $invoiceItemList = $('#invoiceItemList');

            let listItemCount = 1;
            ipcRenderer.send('viewDiscountByPartyMasterIdAndProductCategoryId', {
              partymasterId: +(invoiceItem.partymasterId),
              productcategoryId: +(invoiceItem.productcategoryId)
            });


            let totalAmt = 0, totalAmtWithoutDis = 0, qtyCount = 0;

            ipcRenderer.once('getDiscountByPartyMasterIdAndProductCategoryId', function (event, discountData) {
              // console.log(selectedPartyMaster.id + ' ' + selectedProductCategory.id);
              // console.log(discountData);
              if (discountData && discountData.success) {
                console.log(discountData.discountObj.discount + discountData.discountObj.splDiscount);
                let discount = discountData.discountObj.discount;
                let splDiscount = discountData.discountObj.splDiscount;

                data.invoiceItems.forEach(invoiceItem => {
                  $invoiceItemList.append(`
                    <li class="list-group-item" id="amountCalcList" style="padding: 0px">
                      <div class="row" padding-top: -5px"> 
                        <div class="col-1">
                          ${listItemCount++}
                        </div>
                        <div class="col-5">
                          ${invoiceItem.product.name}
                        </div>
                        <div class="col-1">
                          ${invoiceItem.qty}
                        </div>
                        <div class="col-2" id="productPrice">
                          ${invoiceItem.product.price}
                        </div>
                        <div class="col-1"> 
                          ${invoiceItem.unitType}  
                        </div>
                        <div class="col-2">
                          ${(+invoiceItem.qty) * (+invoiceItem.product.price) }
                        </div>
                      </div>
                    </li>
                  `)
                  qtyCount += invoiceItem.qty;
                  totalAmtWithoutDis += +((+invoiceItem.qty) * (+invoiceItem.product.price));
                  totalAmt += (((+invoiceItem.qty) * (+invoiceItem.product.price)) * (100 - (+discount)) * (100 - splDiscount)) / 10000;

                })

                let packingCharges = 0;
                totalAmt = roundTo(totalAmt, 1);

                let cdDiscount = totalAmt * +(invoiceItem.partymaster.dataValues.cd) / 100;
                cdDiscount = roundTo(cdDiscount, 1);

                let grandTotal = totalAmt - (+cdDiscount) + (+(packingCharges));
                grandTotal = roundTo(grandTotal, 1);


                let amtAfterCd = totalAmt - (+cdDiscount);
                amtAfterCd = roundTo(amtAfterCd, 1);


                packingCharges = +(invoiceItem.grandTotal) - +(grandTotal);

                updateAmtDiv();
                $('#addInvoiceItemBtn').click(function () {
                  $('#addInvoiceItemModal').modal('show');
                })

                let invoiceListItems = [];
                let $addInvoiceItemSubmit = $('#addInvoiceItemSubmit')

                let str = '';
                //console.log(products);

                ipcRenderer.send('viewProductByPCategoryId', {
                  id: +(invoiceItem.productcategoryId)
                });

                let $productList = $('#productList');
                let productObj = {};
                ipcRenderer.once('getProductByPCategoryId', (e, data) => {
                  $productList.empty();
                  console.log('product data');
                  console.log(data);
                  data.product.forEach(product => {
                    productObj[product.id] = product;
                    str += `<option name="productList" value="${product.id}">${product.name}</option>`
                  });

                  $productList.append(str);
                })


                $addInvoiceItemSubmit.click(function (e) {

                  let qty = $('#qty').val();
                  let selectedProduct = productObj[+($productList.val())];
                  let per = $('#per').val();
                  per = $(`option[name="unitType"][value="${per}"]`).text();

                  if (qty <= 0 || typeof selectedProduct === "undefined")
                    return;

                  qtyCount += +(qty);
                  invoiceListItems.push({
                    itemNumber: listItemCount,
                    qty: qty,
                    productId: selectedProduct.id,
                    per: per
                  });
                  $invoiceItemList.append(`
                    <li class="list-group-item" id="amountCalcList" style="padding: 0px">
                      <div class="row" padding-top: -5px"> 
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
                          ${(+qty) * (+selectedProduct.price) }
                        </div>
                      </div>
                    </li>
                  `)

                  totalAmtWithoutDis += +((+qty) * (+selectedProduct.price));
                  totalAmt += (((+qty) * (+selectedProduct.price)) * (100 - (+discount)) * (100 - splDiscount)) / 10000;

                  totalAmt = roundTo(totalAmt, 1);

                  cdDiscount = totalAmt * +(invoiceItem.partymaster.dataValues.cd) / 100;
                  cdDiscount = roundTo(cdDiscount, 1);

                  amtAfterCd = totalAmt - +(cdDiscount);

                  grandTotal = totalAmt - (+cdDiscount);
                  grandTotal = roundTo(grandTotal, 1);
                  updateAmtDiv();
                  $('#addInvoiceItemModal').modal('hide');
                });

                $('#submitInvoiceAgain').click(function () {
                  $('#printLedger').hide();
                  $('#addInvoiceItemBtn').hide();
                  $('#submitInvoiceAgain').hide();
                  $('#addPackingChargesBtn').hide();

                  let mainContent = $('#mainContent')[0];

                  $(document.body).empty().append(mainContent);


                  $('input, select').css('border', 'none');
                  $('select').css('background', 'white').css('padding-left', "0");
                  $('#mainContent').css('padding', "0px");
                  $('*').css('font-size', '12px');


                  ipcRenderer.send('submitInvoiceDetail', {
                    invoiceId: invoiceItemId,
                    listItems: invoiceListItems
                  });

                  /*ipcRenderer.once('submittedInvoice', (e,data)=>{
                    if(data && data.success) {
                      console.log('edit invoice grand Total');

                    }
                  });*/

                  ipcRenderer.send('editInvoice', {
                    grandTotal: (+grandTotal) + (+packingCharges),
                    id: invoiceItemId
                  })
                  ipcRenderer.once('editedInvoiceItem', (e, editedInvoiceData) => {
                    if (editedInvoiceData && editedInvoiceData.success) {
                      ipcRenderer.send('updateCreditByInvoiceId', {
                        credit: (+grandTotal) + (+packingCharges),
                        invoiceId: invoiceItem.id
                      })

                      ipcRenderer.once('updatedCreditByInvoiceId', (event, data) => {
                        if (data.success) {
                          $('#editInvoiceItemModal').modal('hide');
                          $("#editInvoiceSubmit").unbind("click");
                          $viewInvoicesButton.click();

                        }
                      })
                    }
                  })

                  ipcRenderer.send('printInvoice', {
                    id: 1000
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
                })

                function updateAmtDiv() {
                  $('#totalAmt').empty();
                  $('#totalAmt').append(`
                  <div >
                    
                    <hr>
                      <p class="text-right"><b>Total Qty: ${qtyCount} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Amount:  ${totalAmtWithoutDis}</b></p>
                    <hr>
                    <p class="text-right">
                    
                    <b>
                      
                      Discounted Amount:  ${totalAmt} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                      After CD Amount:  ${amtAfterCd} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                      Packing Charges:  ${packingCharges}
                    
                    </b>
                    </p>
                   
                    <h5 class="text-right">Grand Total:  ${(+grandTotal) + (+packingCharges)}</h5>
                  </div>
                `)
                }
              }
            })


          })

        });

        $('.delete-invoice-item').click(function (e) {
          let invoiceItemId = +(e.target.getAttribute("invoiceItemId"));
          let youSure = window.confirm('Are you sure want to delete this');
          let invoiceItem = invoiceItemObj[invoiceItemId];

          if (youSure) {
            ipcRenderer.send('deleteInvoiceItemById', {
              id: invoiceItemId
            });
            ipcRenderer.once('deletedInvoiceItemById', function (event, data) {
              if (data.success) {
                $viewInvoicesButton.click();
                $resultRow.removeClass('text-danger').addClass('text-success');
                $resultRow.text("Invoice Item Has Been Deleted");

                ipcRenderer.send('deleteLedgerItem', {
                  invoiceId: invoiceItemId
                })
                ipcRenderer.once('deletedLedger', function (e, data) {
                  if (data.success) {
                    ipcRenderer.send('updateBalance', {
                      balance: invoiceItem.grandTotal,
                      partyMasterId: invoiceItem.partyMasterId
                    })

                  }
                })


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

          let invoiceItem = invoiceItemObj[invoiceItemId];

          $('#editInvoiceItemModal').modal('show');

          let $editCases = $('#editCases');
          let $editDateOfInvoice = $('#editDateOfInvoice');
          let $editBilityNo = $('#editBilityNo');
          let $editBilityDate = $('#editBilityDate');
          let $editChalanNo = $('#editChalanNo');
          let $editChalanDate = $('#editChalanDate');
          let $editGrandTotal = $('#editGrandTotal');

          $editCases.val(invoiceItem.cases);
          $editDateOfInvoice.val(invoiceItem.dateOfInvoice);
          $editBilityNo.val(invoiceItem.bilityNo);
          $editBilityDate.val(invoiceItem.bilityDate);
          $editChalanNo.val(invoiceItem.chalanNo);
          $editChalanDate.val(invoiceItem.chalanDate);
          $editGrandTotal.val(invoiceItem.grandTotal);

          $('#editInvoiceSubmit').click(function () {

            ipcRenderer.send('editInvoice', {
              id: +(invoiceItem.id),
              cases: String($editCases.val()),
              dateOfInvoice: $editDateOfInvoice.val(),
              bilityNo: $editBilityNo.val(),
              bilityDate: $editBilityDate.val(),
              chalanNo: $editChalanNo.val(),
              chalanDate: $editChalanDate.val(),
              grandTotal: $editGrandTotal.val()
            });

            ipcRenderer.once('editedInvoiceItem', function () {

              if (invoiceItem.grandTotal !== $editGrandTotal.val()) {
                ipcRenderer.send('updateCreditByInvoiceId', {
                  credit: $editGrandTotal.val(),
                  invoiceId: invoiceItem.id
                })

                ipcRenderer.once('updatedCreditByInvoiceId', (event, data) => {
                  if (data.success) {
                    $('#editInvoiceItemModal').modal('hide');
                    $("#editInvoiceSubmit").unbind("click");
                    $viewInvoicesButton.click();

                  }
                })
              }


            })

          })

        })

      });

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
        $mainContent.empty();
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
                    <b>CD</b>
                  </div>
                  <div class="col-2">
                   
                  </div>
                </div>
              </li>
          `;

          let partyMasterRowObj = {};
          data.partyMasterRows.forEach(function (party) {
            partyMasterRowObj[party.id] = party;
            str += `
            <ul class="list-group text-center">
              <li class="list-group-item">
                <div class="row" partyId="${party.id}">
                  <div class="col-1">
                    ${party.id}
                  </div>
                  <div class="col-2">
                    ${party.name}
                  </div>
                  <div class="col-1">
                    ${party.destination}
                  </div>
                  <div class="col-1">
                    ${party.marka}
                  </div>
                  <div class="col-1">
                    ${party.openingBalance}
                  </div>
                  <div class="col-1">
                    ${party.openingBalanceDate}
                  </div>
                  <div class="col-2">
                    ${party.transport}
                  </div>
                  <div class="col-1">
                    ${party.cd}
                  </div>
                  <div class="col-2">
                   <button id="editPartyMasterBtn" class="btn btn-primary editPartyMasterBtn">Edit</button>
                   <button id="viewPartyDiscount" class="btn btn-primary viewDiscounts">View Discount</button>
                  </div>
                </div>
              </li>
          `;
          });
          str += "</ul>"

          $mainContent.append(str);

          let $editPartyMaster = $('.editPartyMasterBtn');

          $editPartyMaster.click(function (event) {

            $('#editPartyMasterModal').modal('show');

            let partyMasterId = +(event.target.parentNode.parentNode.getAttribute('partyId'));

            let selectedParty = partyMasterRowObj[partyMasterId];

            let $editPartyName = $('#editPartyName');
            let $editDestination = $('#editDestination');
            let $editMarka = $('#editMarka');
            let $editOpeningBalance = $('#editOpeningBalance');
            let $editOpeningBalanceDate = $('#editOpeningBalanceDate');
            let $editTransport = $('#editTransport');
            let $editDiscount = $('#editDiscount');
            let $editSplDiscount = $('#editSplDiscount');
            let $editCd = $('#editCd');

            $editPartyName.val(selectedParty.name);
            $editDestination.val(selectedParty.destination);
            $editMarka.val(selectedParty.marka);
            $editOpeningBalance.val(selectedParty.openingBalance);
            $editOpeningBalanceDate.val(selectedParty.openingBalanceDate);
            $editTransport.val(selectedParty.transport);
            $editDiscount.val(selectedParty.discount);
            $editSplDiscount.val(selectedParty.splDiscount);
            $editCd.val(selectedParty.cd);

            $('#editPartySubmit').click(function () {
              let editPartyMasterData = {
                id: partyMasterId,
                name: $editPartyName.val(),
                destination: $editDestination.val(),
                marka: $editMarka.val(),
                openingBalance: +($editOpeningBalance.val()),
                openingBalanceDate: $editOpeningBalanceDate.val(),
                transport: $editTransport.val(),
                discount: $editDiscount.val(),
                splDiscount: $editSplDiscount.val(),
                cd: $editCd.val()
              };

              if (!editPartyMasterData.name || !editPartyMasterData.destination || !editPartyMasterData.marka
                || editPartyMasterData.openingBalance === "" || editPartyMasterData.openingBalanceDate === ""
                || !editPartyMasterData.transport || !editPartyMasterData.discount === ""
                || editPartyMasterData.splDiscount === "" || editPartyMasterData.cd === "") {
                return;
                // console.log(editPartyMasterData);
              }


              ipcRenderer.send('editPartyMaster', editPartyMasterData);
              ipcRenderer.once('editedPartyMaster', function (event, data) {
                console.log(data);
                if (data.success) {
                  $('#editPartyMasterModal').modal('hide');
                  $('#viewPartyMaster').click();
                }
              })
              $("#editPartySubmit").unbind("click");
            })
          });
          let viewPartyDiscounts = $('.viewDiscounts');

          viewPartyDiscounts.click(function (event) {
            $mainContent.empty();

            let str = `
              <ul class="list-group text-center">
                <li class="list-group-item">
                  <div class="row">
                    <div class="col-3">
                      <b>Product Category</b>
                    </div>
                    <div class="col-3">
                      <b>Discount</b>
                    </div>
                    <div class="col-3">
                      <b>Spl Discount</b>
                    </div>
                    <div class="col-3"></div>
                  </div>
                </li>
            `;

            let partyMasterId = +(event.target.parentNode.parentNode.getAttribute('partyId'));


            ipcRenderer.send('viewDiscountsByPartyId', {
              partyMasterId: partyMasterId
            });
            ipcRenderer.once('getDiscountsByPartyId', function (event, data) {
              if (data.success) {
                console.log(data);
                if (data.partyMasterDiscounts.length === 0) {
                  $resultRow.removeClass('text-success').addClass('text-danger');
                  $resultRow.text("Add party master and discount");
                  return;
                }

                data.partyMasterDiscounts.forEach(function (partyMasterDiscount) {
                  str += `
                    <li class="list-group-item">
                      <div class="row">
                        <div class="col-3">
                          ${partyMasterDiscount.productcategory.dataValues.name}
                        </div>
                        <div class="col-3">
                          ${partyMasterDiscount.dataValues.discount}
                        </div>
                        <div class="col-3">
                          ${partyMasterDiscount.dataValues.splDiscount}
                        </div>
                        <div class="col-3">
                          <button class="btn btn-primary editProductCategoryDiscount" productCategoryId="${partyMasterDiscount.dataValues.productcategoryId}">
                            EDIT
                          </button>
                        </div>
                      </div>
                    </li>
                  `;
                })

                str += '</ul>'

                $mainContent.append(str);

                let $editProductCategoryDiscount = $('.editProductCategoryDiscount');

                $editProductCategoryDiscount.click(function (e) {
                  console.log('click');
                  $('#editPartyProductCategoryDiscountModal').modal('show');
                  console.log('valu');
                  console.log(+(e.target.getAttribute('productCategoryId')));
                  let selectedProductCategoryId = +(e.target.getAttribute('productCategoryId'));

                  let $editProductCategoryDiscount = $('#editProductCategoryDiscount');
                  let $editProductCategorySplDiscount = $('#editProductCategorySplDiscount');

                  $editProductCategoryDiscount.val(0);
                  $editProductCategorySplDiscount.val(0);

                  $('#editProductCategoryDiscountSubmit').click(function (e) {
                    console.log('modal submit click');
                    if (!$editProductCategoryDiscount.val() || !$editProductCategorySplDiscount.val()) {
                      //console.log('this');
                      return;
                    }
                    ipcRenderer.send('updatePartyProductCategoryDiscount', {
                      productCategoryId: selectedProductCategoryId,
                      partyMasterId: partyMasterId,
                      discount: $editProductCategoryDiscount.val(),
                      splDiscount: $editProductCategorySplDiscount.val()
                    });


                    ipcRenderer.once('updatedPartyProductCategoryDiscount', function (e, data) {
                      $('#editPartyProductCategoryDiscountModal').modal('hide');

                      if (data.success) {
                        $('#viewPartyMaster').click()
                      }
                      else {
                        $resultRow.removeClass('text-success').addClass('text-danger');
                        $resultRow.text("Error is" + data.error);
                      }
                    });
                    $("#editProductCategoryDiscountSubmit").unbind("click");
                  })
                })
              }
              else {
                $resultRow.removeClass('text-success').addClass('text-danger');
                $resultRow.text("Error is" + data.error);
              }
            })

          });

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
      <div class="col text-center">
        <button id="viewProductSales" class="btn btn-primary">View Product Sales</button>
      </div>
    `);

    const $addProductButton = $('#addProductButton');
    const $viewProductsButton = $('#viewProductsButton');
    const $addProductCategoryButton = $('#addProductCategoryButton');
    const $viewProductCategoriesButton = $('#viewProductCategoriesButton');
    const $viewProductSales = $('#viewProductSales');

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

        }
        else {
          $resultRow.removeClass('text-success').addClass('text-danger');
          $resultRow.text("Product Category Could Not Be Viewed Because " + data.error);
        }
      });
    });

    $viewProductSales.click(function () {
      $mainContent.empty();
      $resultRow.empty();

      ipcRenderer.send('viewProductCategories');

      ipcRenderer.once('getProductCategories', (event, productCategories) => {

        if (productCategories.success) {
          let str = `
            <ul class="list-group text-center">
              <li class="list-group-item">
                <div class="row align-items-center">
                  <div class="col-8">
                    <b>Product Category Name</b>
                  </div>
                </div>
              </li>
          `;


          productCategories.productCategories.forEach((productCategory) => {
            str += `
              <li class="list-group-item">
                <div class="row align-items-center">
                  <div class="col-8">
                    <b>${productCategory.name}</b>
                  </div>
                  <div class="col-2">
                    <button class="btn btn-success view-product-sales" productCategoryId="${productCategory.id}">
                      View Product Sales
                    </button>
                  </div>
                </div>
              </li>
            `
          });

          str += `
              <li class="list-group-item">
                <div class="row align-items-center">
                  <div class="col-8">
                    <b>All</b>
                  </div>
                  <div class="col-2">
                    <button class="btn btn-success view-product-sales" productCategoryId="0">
                      View Product Sales
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          `;
          $mainContent.empty().append(str);

          $('.view-product-sales').click((e) => {
            console.log(1)
            let productCategoryId = +(e.target.getAttribute("productCategoryId"));
            if (productCategoryId === 0) {
              console.log(1)
              ipcRenderer.send('viewProductSales');

              ipcRenderer.once('getProductSales', (event, productData) => {
                console.log(productData)
                if (productData.success) {

                  productData.productSales.sort(function (a, b) {
                    if (+(a.totalQty) < +(b.totalQty))
                      return 1;
                    if (+(a.totalQty) > +(b.totalQty))
                      return -1;
                    return 0;
                  })

                  console.log(productData);

                  let str = `
            <ul class="list-group text-center">
              <li class="list-group-item">
                <div class="row align-items-center">
                  <div class="col-6">
                    <b>Product Name</b>
                  </div>
                  <div class="col">
                    <b>Total Qty</b>
                  </div>
                </div>
              </li>
          `;

                  let totalQuantity = 0;
                  productData.productSales.forEach(productSale => {
                    str += `
              <li class="list-group-item">
                <div class="row align-items-center">
                  <div class="col-6">
                    ${productSale.product.name}
                  </div>
                  <div class="col">
                    ${productSale.totalQty}
                  </div>
                </div>
              </li>
            `;

                    totalQuantity += productSale.totalQty;
                  })
                  str += `
              <li class="list-group-item">
                <div class="row align-items-center">
                  <div class="col-6">
                    <b>Total</b>
                  </div>
                  <div class="col">
                    <b>${totalQuantity}</b>
                  </div>
                </div>
              </li>
            </ul>
          `;
                  $mainContent.empty().append(str);
                }
              });


            } else {
              console.log(3)
              ipcRenderer.send('viewProductSalesByProductCategoryId', {
                id: productCategoryId
              });

              ipcRenderer.once('getProductSalesByProductCategoryId', (event, productData) => {
                console.log(productData)
                if (productData.success) {
                  console.log(productData.productSales)
                  productData.productSales.sort(function (a, b) {
                    if (+(a.totalQty) < +(b.totalQty))
                      return 1;
                    if (+(a.totalQty) > +(b.totalQty))
                      return -1;
                    return 0;
                  });

                  console.log(productData.productSales)

                  let str = `
                    <ul class="list-group text-center">
                      <li class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col-6">
                            <b>Product Name</b>
                          </div>
                          <div class="col">
                            <b>Total Qty</b>
                          </div>
                        </div>
                      </li>
                  `;

                  let totalQuantity = 0;
                  productData.productSales.forEach(productSale => {
                    str += `
                      <li class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col-6">
                            ${productSale.product.name}
                          </div>
                          <div class="col">
                            ${productSale.totalQty}
                          </div>
                        </div>
                      </li>
                    `;

                    totalQuantity += productSale.totalQty;
                  })
                  str += `
                    <li class="list-group-item">
                      <div class="row align-items-center">
                        <div class="col-6">
                          <b>Total</b>
                        </div>
                        <div class="col">
                          <b>${totalQuantity}</b>
                        </div>
                      </div>
                    </li>
                  </ul>
                  `;
                  $mainContent.empty().append(str);
                }
              });
            }

          })
        }

      });

      /*
      ipcRenderer.send('viewProductSales');

      ipcRenderer.once('getProductSales', (event, productData) => {

        if (productData.success) {

          productData.productSales.sort(function (a, b) {
            if (+(a.totalQty) < +(b.totalQty))
              return 1;
            if (+(a.totalQty) > +(b.totalQty))
              return -1;
            return 0;
          })

          console.log(productData);

          let str = `
            <ul class="list-group text-center">
              <li class="list-group-item">
                <div class="row align-items-center">
                  <div class="col-6">
                    <b>Product Name</b>
                  </div>
                  <div class="col">
                    <b>Total Qty</b>
                  </div>
                </div>
              </li>
          `;

          let totalQuantity = 0;
          productData.productSales.forEach(productSale => {
            str += `
              <li class="list-group-item">
                <div class="row align-items-center">
                  <div class="col-6">
                    ${productSale.product.name}
                  </div>
                  <div class="col">
                    ${productSale.totalQty}
                  </div>
                </div>
              </li>
            `;

            totalQuantity += productSale.totalQty;
          })
          str += `
              <li class="list-group-item">
                <div class="row align-items-center">
                  <div class="col-6">
                    <b>Total</b>
                  </div>
                  <div class="col">
                    <b>${totalQuantity}</b>
                  </div>
                </div>
              </li>
            </ul>
          `;
          $mainContent.append(str);
        }
      });

      */
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
      <div class="col text-center">
        <button id="masterLedger" class="btn btn-primary">Master Ledger</button>
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
    const $masterLedger = $('#masterLedger');

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
            <h3>${data.ledgerRows[0].partymaster.name}</h3>  
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
                  <div class="col"></div>
                </div>
              </li>
          `;

            str += `
              
              <li class="list-group-item">
                <div class="row align-items-center">
                  <div class="col">Opening Balance</div>
                  <div class="col">${data.ledgerRows[0].partymaster.openingBalanceDate.split('-').reverse().join('/')}</div>
                  <div class="col"></div>
                  <div class="col"></div>
                  <div class="col"></div>
                  <div class="col">${data.ledgerRows[0].partymaster.openingBalance}</div>
                  <div class="col"></div>
                </div>
              </li>`;
            let debitTotal = 0, creditTotal = data.ledgerRows[0].partymaster.openingBalance;
            data.ledgerRows.forEach(function (ledgerRow) {
              creditTotal += ledgerRow.credit;
              debitTotal += ledgerRow.debit;
              let strBtn = '';
              if (ledgerRow.debit > 0 && ledgerRow.credit === 0) {
                strBtn = `<button class="btn btn-primary deletePayment" ledgerId="${ledgerRow.id}">Delete</button>`
              }
              str += `
              <li class="list-group-item">
                <div class="row align-items-center">
                  <div class="col">${ledgerRow.description}</div>
                  <div class="col">${ledgerRow.dateOfTransaction.split('-').reverse().join('/')}</div>
                  <div class="col">${ledgerRow.productCategoryName}</div>
                  <div class="col">${ledgerRow.debit}</div>
                  <div class="col">${ledgerRow.credit}</div>
                  <div class="col">${creditTotal - debitTotal}</div>
                  <div class="col">${strBtn}</div>
                </div>
              </li>
              `
            });
            str += "</ul>"


            str += `
              <div class="row">
                <div class="col-5"></div>
                <button class="btn btn-primary" id="printLedger">Print Ledger</button>
                <div class="col-5"></div>
              </div>
            `

            $mainContent.append(str);

            $('.deletePayment').click(function (event) {
              let ledgerId = +(event.target.getAttribute('ledgerId'));

              ipcRenderer.send('deletePayment', {
                ledgerId: ledgerId
              })

              ipcRenderer.once('deletedPayment', (e, data) => {
                console.log(data);
                if (data.success) {
                  $viewLedger.click();
                }
                else {
                  $resultRow.removeClass('text-success').addClass('text-danger');
                  $resultRow.text("Ledger Could Not Be delete " + data.error);
                }
              })
            });


            $('#printLedger').click(function () {
              $('#printLedger').hide();
              $('#addInvoiceItemBtn').hide();
              $('#addPackingChargesBtn').hide();

              let mainContent = $('#mainContent')[0];

              $(document.body).empty().append(mainContent);


              $('input, select').css('border', 'none');
              $('select').css('background', 'white').css('padding-left', "0");
              $('#mainContent').css('padding', "0px");
              $('*').css('font-size', '12px');

              ipcRenderer.send('printInvoice', {
                id: 1000
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
            })
          } else {
            $resultRow.removeClass('text-success').addClass('text-danger');
            $resultRow.text("Ledger Could Not Be printed" + data.error);
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
    });

    $masterLedger.click(e => {
      $mainContent.empty();
      ipcRenderer.send('viewMasterLedger');

      ipcRenderer.once('getMasterLedger', (e, ledgerData) => {
        if (ledgerData.success) {

          let str = `
            <ul class="list-group text-center">
              <li class="list-group-item">
                <div class="row">
                  
                  <div class="col">
                    <b>Party Name</b>
                  </div>
                  <div class="col">
                    <b>Debit</b>
                  </div>
                  <div class="col">
                    <b>Credit</b>
                  </div>
                  <div class="col">
                    <b>Balance</b>
                  </div>
                  
                </div>
              </li>
          `;
          let totalDebit = 0, totalCredit = 0;
          ledgerData.ledgerItems.forEach(ledgerItem => {
            str += `
              <li class="list-group-item">
                <div class="row">
                  
                  <div class="col">
                    ${ledgerItem.partymaster.name}
                  </div>
                  <div class="col">
                    ${ledgerItem.debit}
                  </div>
                  <div class="col">
                    ${ledgerItem.credit}
                  </div>
                  <div class="col">
                    ${(+(ledgerItem.credit) - ledgerItem.debit)}
                  </div>
                  
                </div>
              </li>
            `
            totalDebit += ledgerItem.debit;
            totalCredit += ledgerItem.credit;
          })
          str += `
            <li class="list-group-item">
                <div class="row">
                  
                  <div class="col">
                    <b>TOTAL</b>
                  </div>
                  <div class="col">
                    <b>${totalDebit}</b>
                  </div>
                  <div class="col">
                    <b>${totalCredit}</b>
                  </div>
                  <div class="col">
                    <b>${(+(totalCredit) - totalDebit)}</b>
                  </div>
                  
                </div>
              </li>
            </ul>      
            <input class="btn btn-primary" type="submit" value="PRINT" id="printMasterLedger">
          `;

          $mainContent.append(str);

          $('#printMasterLedger').click(function () {
            $('#printMasterLedger').hide();


            let mainContent = $('#mainContent')[0];

            $(document.body).empty().append(mainContent);
            $(document.body).css('padding-top', '0px')

            $('input, select').css('border', 'none');
            $('select').css('background', 'white').css('padding-left', "0");
            $('#mainContent').css('padding', "0px");
            $('*').css('font-size', '12px');

            //$('*').css('padding', "");

            // TODO PRINT MAIN CONTENT NOT WORKING HERE
            ipcRenderer.send('printInvoice');
            ipcRenderer.once('printedInvoice', function (event, data) {
              console.log(data);
              if (data.success) {
                location.reload();
              } else {
                window.alert("Could not add invoice");
                $('#resultRow').removeClass('text-success').addClass('text-danger');
                $('#resultRow').text("Invoice Could Not Be Added");
                $mainContent.empty();
              }
            })
          })
        }
        else {
          $resultRow.removeClass('text-success').addClass('text-danger');
          $resultRow.text("Invoice Could Not Be Added Because " + data.error);
        }
      })
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
    return today.toISOString().split('T')[0];
  }

  function roundTo(n, digits) {
    return Math.round(n * Math.pow(10, 2) / Math.pow(10, 2))
  }
});




