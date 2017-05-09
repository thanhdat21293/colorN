<template>
	<div class="container">
        <myheader :user="user" :login="login" :search="search" :logout="logout" :register="register" ></myheader>
		<div class="row">
			<div id="container-color" v-if="dt">
				<div class="item" v-for="i in dt">
					<div class="item_inner moredetail">
                        <div class="box-info col-sm-4">
                            <div class="row">
                                <div class="box-name">{{ i.name }}</div>
                                <!--<div class="box-date"><i class="fa fa-calendar" aria-hidden="true"></i>{{ i.date }}</div>-->
                                <div class="box-author">
                                    <i class="fa fa-user" aria-hidden="true"></i> {{ i.author }} 
                                    <!--<i class="fa fa-envelope-o" aria-hidden="true"></i> {{ i.author_email }} -->
                                </div>
                                <a class="more_detail" :href="'/detail/' + i.id">More Detail</a>
                                <!--<div class="box-like-dislike-share">
                                    <span class="box-like"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> {{ i.like }}</span>
                                    <span class="box-dislike"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i> {{ i.dislike }}</span>
                                    <span class="share"> <i class="fa fa-share-alt" aria-hidden="true"></i>{{ i.share }}</span>
                                </div>-->
                                <!--<div class="box-des">{{ i.description }}</div>-->
						    </div>
						</div>
							<div class="box-colors col-sm-8">
                                <div class="row">
                                    <span class="colors" :style="{ backgroundColor:  i.color1 }" :data-clipboard-text="i.color1"><i class="myclipboard" aria-hidden="true">{{i.color1}}</i></span>
                                    <span class="colors" :style="{ backgroundColor:  i.color2 }" :data-clipboard-text="i.color2"><i class="myclipboard" aria-hidden="true">{{i.color2}}</i></span>
                                    <span class="colors" :style="{ backgroundColor:  i.color3 }" :data-clipboard-text="i.color3"><i class="myclipboard" aria-hidden="true">{{i.color3}}</i></span>
                                    <span class="colors" :style="{ backgroundColor:  i.color4 }" :data-clipboard-text="i.color4"><i class="myclipboard" aria-hidden="true">{{i.color4}}</i></span>
                                    <span class="colors" :style="{ backgroundColor:  i.color5 }" :data-clipboard-text="i.color5"><i class="myclipboard" aria-hidden="true">{{i.color5}}</i></span>
                                </div>
							</div>
                        <!-- footer -->
                        <!--<footeritem :collection="i"></footeritem>-->
					</div>
				</div>
			</div>
			<div v-else id="container-color">No colors.</div>
		</div>
	</div>
</template>
<script>
    // Vue
    export default {
        data() {
            return {
                dt: [],
                user : {}
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
	
	        },
            logout () {
            },
            search () {
                let term = $("#searchterm").val();
                axios.get( `/search?q=${term}`)
                .then (response => {
                    this.dt = response.data;
                })
                .catch ( error => {
                    this.dt = [];
                });
            }
        },
        ready() {
            new Clipboard('.colors');
            $(".colors").hover ( function () {
                $('.myclipboard', this).toggleClass ('clipboard_show');
            });
        },
    }
</script>