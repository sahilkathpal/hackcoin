<!DOCTYPE html>
<html ng-app="BrsManager">
    <head>
        <meta charset="UTF-8">
        <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
        <link rel="stylesheet" type="text/css" href="{{asset('styles.css')}}"/>
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
          <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->
        <title>Some tool | Built by BRS</title>
    </head>
    <body class="skin-blue" ng-controller="MainCtrl">
       <?php $user = Auth::user(); ?>
        <header class="header">
            <a href="#" class="logo">
                <i class="fa fa-cogs"></i> Some Tool
            </a>
            <nav class="navbar navbar-static-top" role="navigation">
                <a href="#" class="navbar-btn sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </a>
                <div class="navbar-right">
                    <ul class="nav navbar-nav">
                        <li class="dropdown user user-menu">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="glyphicon glyphicon-user"></i>
                                <span>{{$user->name}} <i class="caret"></i></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="user-header bg-light-blue">
                                    <img src="/images/default.jpg" class="img-circle" alt="User Image" />
                                    <p>
                                        
                                    </p>
                                </li>
                                <li class="user-footer">
                                    <div class="pull-left">
                                        <a href="#" class="btn btn-default btn-flat">Profile</a>
                                    </div>
                                    <div class="pull-right">
                                        <a href="/logout" class="btn btn-default btn-flat">Sign out</a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <div class="wrapper row-offcanvas row-offcanvas-left">
            <aside class="left-side sidebar-offcanvas">
                <section class="sidebar">
                    <div class="user-panel">
                        <div class="pull-left image">
                            <img src="/images/default.jpg" class="img-circle" alt="User Image" />
                        </div>
                        <div class="pull-left info">
                            <p>Hello, {{$user->name}}</p>

                            <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
                        </div>
                    </div>
                    <form onsubmit="return false;" class="sidebar-form">
                        <div class="input-group">
                            <input type="text" name="q" class="form-control" placeholder="Search..."/>
                            <span class="input-group-btn">
                                <button type='submit' name='seach' id='search-btn' class="btn btn-flat"><i class="fa fa-search"></i></button>
                            </span>
                        </div>
                    </form>
                    <ul class="sidebar-menu">
                        <li id="menuDashboard" ng-show="active_user_profile.role < 2">
                            <a href="/#/">
                                <i class="fa fa-dashboard"></i> <span>Dashboard</span>
                            </a>
                        </li>
                        <li class="treeview" ng-show="active_user_profile.role < 3">
                            <a href="#">
                                <i class="fa fa-home"></i> <span>Properties</span>
                                <i class="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul class="treeview-menu">
                                <li><a href="/#/properties"><i class="fa fa-angle-double-right"></i> All</a></li>
                                <li><a href="/#/properties/add"><i class="fa fa-angle-double-right"></i> Add</a></li>
                            </ul>
                        </li>
                        <li class="treeview" ng-show="active_user_profile.role < 3">
                            <a href="#">
                                <i class="fa fa-list-ul"></i> <span>Workorders</span>
                                <i class="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul class="treeview-menu">
                                <li><a href="/#/workorders"><i class="fa fa-angle-double-right"></i> All</a></li>
                                <li><a href="/#/workorders/add"><i class="fa fa-angle-double-right"></i> Add</a></li>
                                <li><a href="/#/workorders/validate"><i class="fa fa-angle-double-right"></i> Validate</a></li>
                            </ul>
                        </li>
                        <li class="treeview" ng-show="active_user_profile.role < 2">
                            <a href="#">
                                <i class="fa fa-users"></i> <span>Users</span>
                                <i class="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul class="treeview-menu">
                                <li><a href="/#/users"><i class="fa fa-angle-double-right"></i> All</a></li>
                                <li><a href="/#/users/add"><i class="fa fa-angle-double-right"></i> Add</a></li>
                            </ul>
                        </li>
                        <li class="treeview" ng-show="active_user_profile.role < 2">
                            <a href="#">
                                <i class="fa fa-cogs"></i> <span>Settings</span>
                                <i class="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul class="treeview-menu">
                                <li><a href="/#/sections"><i class="fa fa-angle-double-right"></i> Products</a></li>
                                <li><a href="/#/tasks"><i class="fa fa-angle-double-right"></i> Tasks</a></li>
                                <li><a href="/#/tasks/add"><i class="fa fa-angle-double-right"></i> Add Tasks</a></li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </aside>

            <aside id="flash" class="right-side">

                <div class="alert alert-dismissable">
                    <i class="fa fa-check"></i>
                    <button type="button" class="close" aria-hidden="true">×</button>
                    <span id="flashMessage"></span>
                </div>

            </aside>

            <ng-view></ng-view>
        </div>


		<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyClqPLCWH7xPTsSH3kexF0FJkJOBMwQ1G4"></script>
        <script src="{{asset('vendor.js')}}"></script>
        <script src="{{asset('application.js')}}"></script>

    </body>
</html>