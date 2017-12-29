/**
 * Created by bhavyaagg on 29/12/17.
 */

$(document).ready(function () {

  const $invoicesButton = $('#invoicesButton')
    , $partyMasterButton = $('#partyMasterButton')
    , $productButton = $('#productButton')
    , $subHeader = $('#subHeader')
    , $mainContent = $('#mainContent');


  $invoicesButton.click(function () {
    $subHeader.empty();
    $subHeader.append(`
      <div class="col text-center">
        <button id="addInvoiceButton" class="btn btn-primary">Add Invoice</button>
      </div>
      <div class="col text-center">
        <button id="viewInvoicesButton" class="btn btn-primary">View Invoices</button>
      </div>
    `)
  });

  $partyMasterButton.click(function () {
    $subHeader.empty();
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
      $mainContent.append(`
      
        <div class="form-group row">
          <label for="partyName" class="col-2 col-form-label">Party Name</label>
          <div class="col-10">
            <input class="form-control" type="text" value="" id="partyName">
          </div>
        </div>
        
        <div class="form-group row">
          <label for="destination" class="col-2 col-form-label">Destination</label>
          <div class="col-10">
            <input class="form-control" type="text" value="" id="destination">
          </div>
        </div>
        
        <div class="form-group row">
          <label for="marka" class="col-2 col-form-label">Marka</label>
          <div class="col-10">
            <input class="form-control" type="text" value="" id="marka">
          </div>
        </div>
        
        <div class="form-group row">
          <label for="openingBalance" class="col-2 col-form-label">Opening Balance</label>
          <div class="col-10">
            <input class="form-control" type="number" id="openingBalance">
          </div>
        </div>
        
        <div class="form-group row">
          <label for="openingBalanceDate" class="col-2 col-form-label">Opening Balance Date</label>
          <div class="col-10">
            <input class="form-control" type="date" value="2011-08-19" id="openingBalanceDate">
          </div>
        </div>
        
        <div class="form-group row">
          <label for="transport" class="col-2 col-form-label">Transport</label>
          <div class="col-10">
            <input class="form-control" type="text" value="" id="transport">
          </div>
        </div>
        
        <div class="form-group row">
          <label for="discount" class="col-2 col-form-label">Discount(%)</label>
          <div class="col-10">
            <input class="form-control" type="number" id="discount">
          </div>
        </div>       
         
        <div class="form-group row">
          <label for="splDiscount" class="col-2 col-form-label">Spl. Discount(%)</label>
          <div class="col-10">
            <input class="form-control" type="number" id="splDiscount">
          </div>
        </div>        
        
        <div class="form-group row">
          <label for="cd" class="col-2 col-form-label">CD(%)</label>
          <div class="col-10">
            <input class="form-control" type="number" id="cd">
          </div>
        </div>         
      `)

    })
  });


  $productButton.click(function () {
    $subHeader.empty();
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
      $mainContent.append(`
        <div class="form-group row">
          <label for="productName" class="col-3 col-form-label">Product Name: </label>
          <div class="col-9">
            <input id="productName" class="form-control" type="text" placeholder="Enter Product Name">
          </div>
        </div>
      `)
    })

    $viewProductsButton.click(function () {
      $mainContent.empty();
      $mainContent.append(`
        <div class="form-group row">
          <label for="productName" class="col-3 col-form-label">Product Name: </label>
          <div class="col-9">
            <input id="productName" class="form-control" type="text" placeholder="Enter Product Name">
          </div>
        </div>
      `)
    })

    $addProductCategoryButton.click(function () {
      $mainContent.empty();
      $mainContent.append(`
        <div class="form-group row">
          <label for="productName" class="col-4 col-form-label">Product Category Name: </label>
          <div class="col-8">
            <input id="productName" class="form-control" type="text" placeholder="Enter Product Category Name">
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
      `)
    });

    $viewProductCategoriesButton.click(function () {
      $mainContent.empty();
      $mainContent.append(`
        <div class="form-group row">
          <label for="productName" class="col-4 col-form-label">Product Category Name: </label>
          <div class="col-8">
            <input id="productName" class="form-control" type="text" placeholder="Enter Product Category Name">
          </div>
        </div>
      `)
    })

  });
});