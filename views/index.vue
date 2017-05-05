<template>
	<div class="container">
		<div class="row">
			<headerhome></headerhome>
			<div id="container-color" v-if="dt">
				<div class="item" v-for="i in dt">
					<div class="item_inner moredetail" :data-slug="i.name">
                        <div class="box-info col-sm-4">
                            <div class="row">
                                <div class="box-name" :data-slug="i.name">{{ i.name }}</div>
                                <!--<div class="box-date"><i class="fa fa-calendar" aria-hidden="true"></i>{{ i.date }}</div>-->
                                <div class="box-author" :data-slug="i.name">
                                    <i class="fa fa-user" aria-hidden="true"></i> {{ i.author }} 
                                    <!--<i class="fa fa-envelope-o" aria-hidden="true"></i> {{ i.author_email }} -->
                                </div>
                                <!--<div class="box-like-dislike-share" :data-slug="i.name">
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
                        <footeritem :collection="i"></footeritem>
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
                dt: []
            }
        },
        ready() {
            new Clipboard('.colors');
        },
    }
</script>