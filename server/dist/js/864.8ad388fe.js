"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[864],{2864:function(e,t,a){a.r(t),a.d(t,{default:function(){return L}});var d=a(3396),c=a(7139),n=a(9676);const s=e=>((0,d.dD)("data-v-53e60c9b"),e=e(),(0,d.Cn)(),e),o={class:"header"},m=s((()=>(0,d._)("img",{src:n,alt:""},null,-1))),l=(0,d.Uk)(" Go Back"),i={key:0,class:"comments-wrapper"},r={class:"header"},u={class:"comment_count"},k={class:"comments"},_=s((()=>(0,d._)("div",{class:"user_image"},null,-1))),h={class:"content"},b=s((()=>(0,d._)("button",{class:"reply_comment"},"Reply",-1))),E=["onClick"],f={class:"user"},C={class:"mute"},v={class:"message"},D=s((()=>(0,d._)("div",{class:"replies"},null,-1)));function p(e,t,a,n,s,p){const w=(0,d.up)("router-link"),g=(0,d.up)("Feedback"),F=(0,d.up)("AddComment");return(0,d.wg)(),(0,d.iD)("div",null,[(0,d._)("div",o,[(0,d.Wm)(w,{to:"/"},{default:(0,d.w5)((()=>[m,l])),_:1}),s.feedback.ownFeedback?((0,d.wg)(),(0,d.j4)(w,{key:0,to:"/update/"+s.feedback.data?._id,class:"edit"},{default:(0,d.w5)((()=>[(0,d.Uk)("Edit Feedback "+(0,c.zw)(s.rgdata.message),1)])),_:1},8,["to"])):(0,d.kq)("",!0)]),(0,d.Wm)(g,{feedback:s.feedback.data},null,8,["feedback"]),s.feedback?.comments?.length?((0,d.wg)(),(0,d.iD)("div",i,[(0,d._)("div",r,[(0,d._)("h2",u,(0,c.zw)(s.feedback?.comments?.length)+" comments",1)]),(0,d._)("div",k,[((0,d.wg)(!0),(0,d.iD)(d.HY,null,(0,d.Ko)(s.feedback?.comments,(e=>((0,d.wg)(),(0,d.iD)("div",{class:"comment",key:e.USER._id},[_,(0,d._)("div",h,[b,s.feedback.currentUserId==e.USER._id?((0,d.wg)(),(0,d.iD)("button",{key:0,onClick:t=>p.deleteComment(e._id),class:"remove_comment"}," Remove ",8,E)):(0,d.kq)("",!0),(0,d._)("div",f,[(0,d._)("b",null,(0,c.zw)(e.USER.NAME+" "+e.USER.LASTNAME),1),(0,d._)("p",C,"@"+(0,c.zw)(e.USER.USERNAME),1)]),(0,d._)("div",v,[(0,d._)("p",null,(0,c.zw)(e.COMMENT),1)])]),D])))),128))])])):(0,d.kq)("",!0),(0,d.Wm)(F,{onAdd:p.addComment},null,8,["onAdd"]),s.feedback.ownFeedback?((0,d.wg)(),(0,d.iD)("button",{key:1,onClick:t[0]||(t[0]=e=>p.deleteFeedBack(s.feedback.data?._id)),class:"delete"}," Delete Feedback ")):(0,d.kq)("",!0)])}var w=a(5951),g=a(9242);const F=e=>((0,d.dD)("data-v-119e29a6"),e=e(),(0,d.Cn)(),e),A=F((()=>(0,d._)("label",null,"Add comment",-1))),M=["maxlength"],T={class:"actions"},y={class:"character_counter"},U=F((()=>(0,d._)("button",null,"Post comment",-1)));function N(e,t,a,n,s,o){return(0,d.wg)(),(0,d.iD)("form",{class:"addComment",onSubmit:t[1]||(t[1]=(0,g.iM)(((...e)=>o.addComment&&o.addComment(...e)),["prevent"]))},[A,(0,d.wy)((0,d._)("textarea",{required:"",placeholder:"Type your comment here","onUpdate:modelValue":t[0]||(t[0]=e=>s.comment=e),maxlength:s.character_count,cols:"30",rows:"8"},null,8,M),[[g.nr,s.comment]]),(0,d._)("div",T,[(0,d._)("div",y,(0,c.zw)(s.character_count-s.comment.length)+" character left",1),U])],32)}var R={name:"AddComment",data(){return{comment:"",character_count:255}},methods:{addComment(){this.comment&&this.$emit("add",this.comment)}}},S=a(89);const z=(0,S.Z)(R,[["render",N],["__scopeId","data-v-119e29a6"]]);var B=z,q=a(65),O={name:"Feedback Details",components:{Feedback:w.Z,AddComment:B},data(){return{feedback:{},quiz:"asd",rgdata:"a123",totalComment:0}},methods:{...(0,q.nv)(["DELETE_FEEDBACK","ADD_COMMENT","DELETE_COMMENT"]),deleteFeedBack(e){this.DELETE_FEEDBACK(e).then((()=>this.$router.go(-1)))},addComment(e){let t={FEEDBACK_ID:this.feedback.data?._id,COMMENT:e};this.ADD_COMMENT(t).then((e=>this.fetchFeedback()))},fetchFeedback(){let{id:e}=this.$route.params;this.$store.dispatch("FETCH_FEEDBACK",e).then((()=>this.feedback=this.$store.state.feedback))},deleteComment(e){this.DELETE_COMMENT(e).then((e=>this.fetchFeedback()))}},mounted(){this.fetchFeedback()}};const K=(0,S.Z)(O,[["render",p],["__scopeId","data-v-53e60c9b"]]);var L=K}}]);
//# sourceMappingURL=864.8ad388fe.js.map