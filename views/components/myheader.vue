<template>
    <div class="row">
        <div class="header">
            <a href="#" data-toggle="modal" data-target="#login-modal">Login</a>
            <a href="#" data-toggle="modal" data-target="#signin-modal">Signin</a>
            <!-- Login -->
            <div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                <div class="modal-dialog">
                    <div class="centered-form">
                        <div class="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title">Login</h3>
                                </div>
                                <div class="panel-body">
                                    <form action="/login" method="post" name="Login_Form" class="form-signin">
                                        <span id="login_status"></span>
                                        <div class="form-group">
                                            <input type="email" class="form-control" id="login_email" name="login_email" placeholder="Email" required="" autofocus="" />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" id="login_password" name="login_password" placeholder="Password" required=""/>     		  
                                        </div>
                                        <button class="btn btn-lg btn-primary btn-block" v-on:click="login()" name="Submit" value="Login" >Login</button>  			
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Sign in -->
            <div class="modal fade" id="signin-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                <div class="modal-dialog">
                    <div class="row centered-form">
                        <div class="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title">Sign In</h3>
                                </div>
                                <div class="panel-body">
                                    <form role="form" method="post" action="/register">
                                        <div class="form-group">
                                            <input type="email" name="email" id="email" required class="form-control" placeholder="Email Address">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" name="password" id="password" required class="form-control" placeholder="Password">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" name="password_confirmation" required id="password_confirmation" class="form-control" placeholder="Confirm Password">
                                        </div>
                                        <input type="submit" value="Register" class="btn btn-lg btn-primary btn-block">
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // Vue
    export default {
        data() {
            return {
                user: {}
            }
        },
        methods : {
            login() {
                axios.post('/login', {
                        email: $("#login_email").val(),
                        password: $("#login_password").val(),
                    })
                    .then(response => {
                        let result = response.data;
                        console.log(result);
                        if ( result['err'] ) {
                            $("#login_status").text (result.error);
                            $("#login_status").css ('color','red');
                        } else {
                            this.user = result.user;
                            console.log(result);
                        }
                    })
                    .catch(error => {
                        this.user = {};
                    });
            },
            register () {

            }
        }
    }
</script>

                         