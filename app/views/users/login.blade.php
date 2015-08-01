<!DOCTYPE html>
<html class="bg-black">
    <head>
        <meta charset="UTF-8">
        <title>Tool</title>
        <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
        <link rel="stylesheet" type="text/css" href="{{asset('styles.css')}}"/>

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
          <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->
    </head>
    <body class="bg-black">

        <div class="form-box" id="login-box">
            <div class="header">Sign In</div>
            <form id="loginFrm" action="login" method="post">
                <div class="body bg-gray">
                    <div class="form-group">
                        <input type="email" name="email" class="form-control" placeholder="Email"/>
                    </div>
                    <div class="form-group">
                        <input type="password" name="password" class="form-control" placeholder="Password"/>
                    </div>
                </div>
                <div class="footer">                                                               
                    <button type="submit" class="btn bg-olive btn-block">Sign me in</button>  
                    <p><a href="#">I forgot my password</a></p>
                </div>
            </form>

<!--
            <div class="margin text-center">
                <span>Sign in using social networks</span>
                <br/>
                <button class="btn bg-light-blue btn-circle"><i class="fa fa-facebook"></i></button>
                <button class="btn bg-aqua btn-circle"><i class="fa fa-twitter"></i></button>
                <button class="btn bg-red btn-circle"><i class="fa fa-google-plus"></i></button>

            </div>
-->
        </div>


        <script type="text/javascript" src="{{asset('bower_components/jquery/dist/jquery.min.js')}}"></script>
        <script type="text/javascript" src="{{asset('bower_components/bootstrap/dist/js/bootstrap.min.js')}}"></script>        
        
        <script>
            $(document).ready(function() {
                $('#loginFrm').submit(function(e) {
                    e.preventDefault();
                    $.post( window.location.origin+'/login', $(this).serialize(), function(data, textStatus, xhr) {
                        console.log( data );
                        if( data.status )
                            window.location.reload();
                        else alert( data.message );
                    });
                });    
            });
        </script>
    </body>
</html>