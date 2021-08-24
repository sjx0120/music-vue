var app = new Vue({
    el:"#app",
    data:{
        music:'',
        musicList:[],
        musicUrl:'',
        //封面显示
        picUrl:'',
        //评论显示
        comments:[],
        //播放状态
        isplay:false,
        //video是否显示
        isshow:false,
        //videoUrl
        videoUrl:''
    },
    methods:{
        getMusic:function(){
            axios.get("https://autumnfish.cn/search?keywords="+this.music)
            .then(function(response){
                console.log(response.data.result.songs);
                app.musicList = response.data.result.songs;
            },function(err){
                console.log(err);
            })
        },
        playMusic:function(musicId){
            //console.log(musicId);
            //获取歌曲播放地址
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(function(response){
                //console.log(response);
                //console.log(response.data.data[0].url);
                app.musicUrl = response.data.data[0].url;
            },function(err){
                console.log(err);
            })
            //获取歌曲封面
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then(function(response){
                //console.log(response);
                //console.log(response.data.songs[0].al.picUrl);
                app.picUrl = response.data.songs[0].al.picUrl;
            },function(err){
                console.log(err);
            })
            //获取歌曲评论
                axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
                .then(function(response){
                    console.log(response);
                    app.comments = response.data.hotComments;
                },function(err){
                    console.log(err);
                })
        },
        play:function(){
            console.log('play');
            this.isplay = true;
        },
        pause:function(){
            console.log('pause');
            this.isplay = false;
        },
        getVideo:function(mvid){
            axios.get("https://autumnfish.cn/mv/url?id="+mvid)
            .then(function(response){
                console.log(response.data.data.url);
                app.videoUrl = response.data.data.url;
                app.isshow = true;
            },function(err){
                console.log(err);
            })
        },
        hide:function(){
            this.isshow=false;
            this.videoUrl='';
        }
    }
})