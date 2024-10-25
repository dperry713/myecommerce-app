@echo off

:: Root Folder
set ROOT_DIR=%cd%

:: Create main folders
mkdir assets
mkdir components
mkdir hooks
mkdir pages
mkdir styles
mkdir utils

:: Create files in the root directory
echo. > %ROOT_DIR%\App.js
echo. > %ROOT_DIR%\index.js

:: Create files in components folder
echo. > %ROOT_DIR%\components\CustomerForm.js
echo. > %ROOT_DIR%\components\CustomerDetail.js
echo. > %ROOT_DIR%\components\ProductForm.js
echo. > %ROOT_DIR%\components\ProductDetail.js
echo. > %ROOT_DIR%\components\OrderForm.js
echo. > %ROOT_DIR%\components\OrderHistory.js
echo. > %ROOT_DIR%\components\ConfirmationModal.js

:: Create files in hooks folder
echo. > %ROOT_DIR%\hooks\useCustomer.js
echo. > %ROOT_DIR%\hooks\useProduct.js
echo. > %ROOT_DIR%\hooks\useForm.js
echo. > %ROOT_DIR%\hooks\useOrder.js

:: Create files in pages folder
echo. > %ROOT_DIR%\pages\CustomerPage.js
echo. > %ROOT_DIR%\pages\ProductPage.js
echo. > %ROOT_DIR%\pages\OrderPage.js
echo. > %ROOT_DIR%\pages\NotFoundPage.js

:: Create files in styles folder
echo. > %ROOT_DIR%\styles\global.css

:: Create files in utils folder
echo. > %ROOT_DIR%\utils\api.js
echo. > %ROOT_DIR%\utils\validation.js

echo Folder and file structure created successfully.
