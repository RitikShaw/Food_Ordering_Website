<!DOCTYPE html>
<html lang="en">
    <link rel="stylesheet" href="/css/bootstrap.min.css" />
    <head>
        <title>Menu</title>
    </head>
    <body>
        <form action="/component/menu" method="post" enctype="multipart/form-data">

            
               

            <input class="form-control w-25" type="number" name="value" placeholder="counter">    

            

            <button type="submit">Submit</button>
        

        </form>
        <button class="form-control" id="btn" onclick="incrementCounter()">Increment Counter</button>
            <button id="btn" onclick="decrementCounter()">Decrement Counter</button>
        <script>
            var count = 0;
            var btn = document.getElementById("btn");
            var disp = document.getElementById("display");
    
            function incrementCounter () {
                count++;
                disp.innerHTML = count;
            }

            function decrementCounter () {
                count--;
                disp.innerHTML = count;
            }

        </script>
    </body>
</html>