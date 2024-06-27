<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script>
        //clear session
        sessionStorage.clear();
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>

</head>

<body>
    <!-- nav -->
    <nav class="navbar navbar-expand-lg bg-body-white"
        style="font-size: xx-large;font-family: monospace;margin: 20px 50px 10px 50px;">
        <div class="container-fluid">
            <div class="logo">
                <img src="images/logo.jpg">
            </div>

            <a id="home" class="navbar-brand" href="index.html">Home</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="reservation.html">Reservation</a>
                    </li>
                </ul>

            </div>
        </div>
    </nav>

    <div style="border-bottom: 1.5px solid rgb(228, 228, 228);"></div>

    <!-- retrieve data of the order Details from DB -->
    <?php
    include 'conn.php';

    $time = $_GET['currentTime'];
    $name = $_GET['name'];
    $number = $_GET['number'];
    $email = $_GET['email'];
    $carName = $_GET['carName'];
    $carImg = $_GET['carImg'];
    $pickup = $_GET['pickup'];
    $return = $_GET['return'];
    $qty = $_GET['qty'];
    $subtotal = $_GET['subtotal'];


    ?>

    <div style="display:flex; justify-content: center;">
        <div style="border:1px dashed black;margin-top:30px;padding: 20px 20px 20px 20px">
            <h2>Order Details</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Customer Name: </td>
                        <td>
                            <?php echo $name ?>
                        </td>
                    </tr>
                    <tr>
                        <td>Phone Number:</td>
                        <td>
                            <?php echo $number ?>
                        </td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>
                            <?php echo $email ?>
                        </td>
                    </tr>
                    <tr>
                        <td>Car Name:</td>
                        <td>
                            <?php echo $carName ?>
                        </td>
                    </tr>
                    <tr>
                        <td>Pick Up Date:</td>
                        <td>
                            <?php echo $pickup ?>
                        </td>
                    </tr>
                    <tr>
                        <td>Return Date:</td>
                        <td>
                            <?php echo $return ?>
                        </td>
                    </tr>
                    <tr>
                        <td>Quantity:</td>
                        <td>
                            <?php echo $qty ?>
                        </td>
                    </tr>
                    <tr>
                        <td>Subtotal:</td>
                        <td>
                            <?php echo $subtotal ?>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <?php
    echo "
    <div style='font-size:50px;display:flex;justify-content:center'>
        Confirm your order&nbsp 
        <a href='changeStatus.php?currentTime=$time&carName=$carName' >here</a>
    </div>
    ";
    ?>

</body>

</html>