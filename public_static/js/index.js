/**
 * Created by bhavyaagg on 29/12/17.
 */

$(document).ready(function () {

  const {ipcRenderer} = require('electron');

  const $invoicesButton = $('#invoicesButton')
    , $partyMasterButton = $('#partyMasterButton')
    , $productButton = $('#productButton')
    , $subHeader = $('#subHeader')
    , $mainContent = $('#mainContent')
    , $resultRow = $('#resultRow');

  const $editProductCategoryModal = $('#editProductCategoryModal');
  const $editProductModal = $('#editProductModal');

  const $editProductCategorySubmit = $('#editProductCategorySubmit');
  const $editProductSubmit = $('#editProductSubmit');

  const $editProductCategoryName = $('#editProductCategoryName');
  const $editProductName = $('#editProductName');
  const $editProductPrice = $('#editProductPrice');
  const $editProductCategoryForProductList = $('#editProductCategoryForProductList');

  const $editProductCategoryError = $('#editProductCategoryError');
  const $editProductError = $('#editProductError')

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
      $mainContent.append(`
        <div class="row">
          <div class="col text-center">
            <h1>Company Name(XYZ)</h1>
            <h6>Rough Estimate</h6>
          </div>
        </div>
        
        <div class="row">
          <div class="col-4">
            <select id="partyMasterList" class="custom-select">
              <option name="partyMasterList" value="0">None</option>
            </select>
          </div>
          <div class="col-4" >
            Slip No.:   
          </div>
          <div class="col-4">
            DATE: 
          </div>
        </div>
        <div class="row">
          <div class="col-2" id="marka">
            Marka:    
          </div>
          <div class="col-3">
            <div class="form-group row">
              <label for="cases" class="col-2 col-form-label">Cases</label>
              <div class="col-4">
                <input class="form-control" type="number" value="0" id="cases">
              </div>
            </div>
          </div>
          <div class="col-3" id="transport">
            Transport:    
          </div>
          <div class="col-4">
            <div class="form-group row">
              <label for="productCategoriesList" class="col-4 col-form-label">Product Category: </label>
              <div class="col-8">
                <select id="productCategoriesList" class="custom-select">
                  <option name="productCategoriesList" value="0">None</option>
                </select>
              </div>
            </div>
          </div>
        </div>  
        <div class="row">
          <div class="col-3">
            <div class="form-group row">
              <label for="bilityNumber" class="col-4 col-form-label">Bilty No.</label>
              <div class="col-8">
                <input class="form-control" type="number" value="0" id="bilityNumber">
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="form-group row">
              <label for="bilityDate" class="col-4 col-form-label">BiltyDate</label>
              <div class="col-8">
                <input class="form-control" type="date" value="2017-08-19" id="bilityDate">
              </div>  
            </div>    
          </div>
          <div class="col-3">
            <div class="form-group row">
              <label for="chalanNumber" class="col-5 col-form-label text-right">Chalan No.</label>
              <div class="col-7">
                <input class="form-control" type="number" value="0" id="chalanNumber">
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="form-group row">
              <label for="bilityDate" class="col-4 col-form-label">Date</label>
              <div class="col-8">
                <input class="form-control" type="date" value="2017-08-19" id="bilityDate">
              </div>  
            </div>    
          </div>
        </div>
        <input class="btn btn-primary" type="submit" value="Submit" id="addInvoiceItem">
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
              <div class="col-1">
                <b>Rate</b>
              </div>
              <div class="col-1">
                <b>Per</b>
              </div>
              <div class="col-1">
                <b>Dis%</b>
              </div>
              <div class="col-1">
                <b>SDis%</b>
              </div>
              <div class="col-1">
                <b>Amt</b>
              </div>
            </div>
          </li>
        </ul>
        
        
      `);


      let $partyMasterList = $('#partyMasterList');
      let $productCategoryList = $('#productCategoriesList');
      let partyMasterRowObj = {};                    // All data with S.no. as key

      let products;
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

      //Get Data in Product Categories DropDown
      let productCategoriesRowObj = getDataProductCategories(); // All product C with id as key

      let $marka = $('#marka');
      let $cases = $('#cases');
      let $transport = $('#transport');

      // On change for party master list
      let selectedRow;
      $partyMasterList.change(function () {
        if ($partyMasterList.val() == 0)   // Check for none in list
          return;
        console.log(partyMasterRowObj[$partyMasterList.val()]);
        selectedRow = partyMasterRowObj[$partyMasterList.val()];

        $marka.empty();
        $marka.append(`Marka: ${selectedRow.marka}`);

        $transport.empty();
        $transport.append(`Transport: ` + selectedRow.transport);
      });

      $productCategoryList.change(function () {
        if ($productCategoryList.val() == 0)
          return;

        let selectedRow = productCategoriesRowObj[$productCategoryList.val()];

        ipcRenderer.send('viewProductByPCategoryId', selectedRow);
        ipcRenderer.once('getProductByPCategoryId', function (event, productList) {

          if (productList.product.length === 0 || !productList.success) {
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

        });

      });

      let listItemCount = 1;
      $invoiceItemList = $('#invoiceItemList');
      let productObj = {};
      $('#addInvoiceItem').click(function () {
        if (typeof selectedRow == 'undefined') {
          return;
        }
        $invoiceItemList.append(`
          <li class="list-group-item">
            <div class="row">
              <div class="col-1">
                ${listItemCount}
              </div>
              <div class="col-5">
                <select id="productList" class="custom-select">
                  <option name="productList" value="0">None</option>
                </select>
              </div>
              <div class="col-1">
                <input class="form-control" type="number" value="0" id="qty">
              </div>
              <div class="col-1" id="productPrice">
                
              </div>
              <div class="col-1"> 
                <select class="custom-select">
                  <option name="type" value="0">Set</option>
                  <option name="type" value="1">Piece</option>
                </select>
              </div>
              <div class="col-1">
                ${selectedRow.discount}
              </div>
              <div class="col-1">
                ${selectedRow.splDiscount}
              </div>
              <div class="col-1" id=amt${listItemCount++}" >
                
              </div>
            </div>
          </li>
          
        
        `)

        let str = '';
        console.log(products);
        products.forEach(product => {
          productObj[product.id] = product;
          str += `<option name="productList" value="${product.id}">${product.name}</option>`
        });
        let $productList = $('#productList');
        $productList.append(str);

        $productList.change(function () {
          if ($productList.val() == 0)
            return;
          $('#productPrice').empty();
          $('#productPrice').append(productObj[$productList.val()].price);
        });
      })


    });


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
          openingBalance: $('#openingBalance').val(),
          openingBalanceDate: $('#openingBalanceDate').val(),
          transport: $('#transport').val(),
          discount: $('#discount').val(),
          splDiscount: $('#splDiscount').val(),
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
          ipcRenderer.send('addPartyMaster', partyMasterData);
          ipcRenderer.once('addedPartyMaster', function (event, data) {
            if (data.success) {
              $resultRow.removeClass('text-danger').addClass('text-success');
              $resultRow.text("Party Has Been Added");
              $mainContent.empty();
            } else {
              $resultRow.removeClass('text-success').addClass('text-danger');
              $resultRow.text("Party Could Not Be Added Because " + data.error);
            }
          });

          console.log("ho gya")
          /*$resultRow.removeClass('text-danger').addClass('text-success');
          $resultRow.text("Product Category Has Been Added");*/
        }
      });

      $('#resetPartyMaster').click(function () {

        $('#partyName').val("");
        $('#destination').val("");
        $('#marka').val("");
        $('#openingBalance').val("");
        $('#openingBalanceDate').val("");
        $('#transport').val("");
        $('#discount').val("");
        $('#splDiscount').val("");
        $('#cd').val("");

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
                    console.log(productData.product.productcategoryId);
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
        $editProductCategoryModal.modal('hide');
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
});
