(this["webpackJsonpcontact-list"]=this["webpackJsonpcontact-list"]||[]).push([[0],{60:function(e,a,t){e.exports=t(73)},72:function(e,a,t){},73:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(12),i=t.n(c),o=t(37),l=t(44),s=t(38),d=t(45),m=t(5),u=t(3),p=t(99),f=t(122),g=t(103),b=t(106),h=t(126),E=t(110),x=t(127),C=t(104),v=t(105),k=t(107),y=t(108),w=t(109),j=Object(p.a)((function(e){return{drawer:{backgroundImage:"linear-gradient(#fa8569, #ff4b6e)",color:"#ffffffbf",boxShadow:"0px 0px 7px darkgrey"},drawerSemi:Object(m.a)({width:e.spacing(7.5)+1,overflow:"hidden"},e.breakpoints.only("xs"),{width:"0px"}),drawerOpen:{width:e.spacing(20)+1},toggleBtn:{padding:4,textAlign:"right"},colorWhite:{color:"#ffffffbf"},menu:{paddingTop:e.spacing(4)+1},leftBorder:{borderLeft:"4px solid transparent","&:hover, &:focus, &.active":{borderColor:"white",backgroundColor:"rgba(0, 0, 0, 0.04)"}}}})),N=function(e){var a,t,n=e.open,c=e.handleMiniDrawerToggle,i=j();return r.a.createElement(f.a,{variant:"permanent",className:Object(u.a)((a={},Object(m.a)(a,i.drawerOpen,"open"===n),Object(m.a)(a,i.drawerSemi,"semi"===n),a)),classes:{paper:Object(u.a)(i.drawer,(t={},Object(m.a)(t,i.drawerOpen,"open"===n),Object(m.a)(t,i.drawerSemi,"semi"===n),t))}},r.a.createElement("div",{className:i.toggleBtn},r.a.createElement(g.a,{color:"inherit",onClick:c},"open"===n?r.a.createElement(C.a,null):r.a.createElement(v.a,null))),r.a.createElement(b.a,{className:i.menu},[{icon:r.a.createElement(k.a,null),name:"Local"},{icon:r.a.createElement(y.a,null),name:"Twitter"},{icon:r.a.createElement(w.a,null),name:"GitHub"}].map((function(e,a){return r.a.createElement(h.a,{button:!0,key:e.name,className:Object(u.a)(i.leftBorder,0===a&&"active")},r.a.createElement(E.a,{className:i.colorWhite},e.icon),r.a.createElement(x.a,{primary:e.name}))}))))},O=t(124),S=t(111),A=Object(p.a)((function(e){return{header:{minHeight:50,width:"100%",boxShadow:"0px 0px 5px darkgrey"}}})),B=function(e){var a=e.handleFullDrawerToggle,t=A();return r.a.createElement("header",{className:t.header},r.a.createElement(O.a,{smUp:!0},r.a.createElement(g.a,{onClick:a},r.a.createElement(S.a,null))))},R=t(53),T=t(112),I=t(121),D=Object(p.a)((function(e){return{header:{display:"flex",alignItems:"center"},headerIcon:{background:"linear-gradient(#fa8569, #ff4b6e)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",color:"#ffffffbf",fontSize:34},headerTitle:{padding:"0px 15px"}}})),W=function(){var e=D();return r.a.createElement(T.a,{item:!0,md:12,className:e.header},r.a.createElement(I.a,{className:"fas fa-address-book fa-flip-horizontal ".concat(e.headerIcon)}),r.a.createElement(I.a,{className:e.headerTitle},r.a.createElement(I.a,{fontWeight:500,fontSize:28},"Contacts"),r.a.createElement(I.a,{fontSize:12},"Welcome to FirstCRM Contact page")))},M=t(101),q=t(75),P=t(114),z=t(113),F=t(115),L=Object(p.a)((function(e){var a,t;return{innerSpacing:Object(m.a)({padding:"40px 50px"},e.breakpoints.only("xs"),{padding:"15px 0px"}),searchBar:{display:"flex",alignItems:"center",backgroundColor:"#f1f1f1",borderRadius:50,padding:"6px 16px"},searchBarSpacing:Object(m.a)({padding:"50px 0px"},e.breakpoints.down("sm"),{padding:"30px 0px"}),searchInput:{flex:1,fontSize:14},btnWrapper:(a={padding:"50px 20px"},Object(m.a)(a,e.breakpoints.down("sm"),{padding:"30px 10px"}),Object(m.a)(a,e.breakpoints.down("xs"),{display:"flex",justifyContent:"space-around",padding:"0px 10px 30px 10px"}),a),actionBtn:(t={background:"linear-gradient(to right, #fa8569, #ff4b6e)",color:"#ffffffbf",textTransform:"none",height:"100%",margin:"0px 2px"},Object(m.a)(t,e.breakpoints.down("sm"),{margin:"0px 6px",minWidth:"48px"}),Object(m.a)(t,e.breakpoints.down("xs"),{minWidth:"90px"}),Object(m.a)(t,e.breakpoints.up("md"),{minWidth:"126px"}),t)}})),U=function(e){var a=e.addContact,t=e.someSelected,n=e.deleteContact,c=e.searchQuery,i=e.searchContact,o=L();return r.a.createElement(T.a,{container:!0,item:!0,md:12},r.a.createElement(T.a,{item:!0,lg:4,md:6,sm:8,xs:12,className:o.searchBarSpacing},r.a.createElement(M.a,{elevation:0,className:o.searchBar},r.a.createElement(q.a,{className:o.searchInput,placeholder:"Search contacts",value:c,onChange:i}),r.a.createElement(z.a,null))),r.a.createElement(T.a,{item:!0,lg:4,md:6,sm:4,xs:12,className:o.btnWrapper},r.a.createElement(P.a,{variant:"contained",className:o.actionBtn,onClick:a},"+ ",r.a.createElement(O.a,{only:"sm"},"Add",r.a.createElement(O.a,{smDown:!0}," Contact"))),t&&r.a.createElement(P.a,{variant:"contained",className:o.actionBtn,onClick:n},r.a.createElement(F.a,{style:{fontSize:16}})," ",r.a.createElement(O.a,{only:"sm"},"Delete"))))},G=t(123),H=Object(p.a)((function(e){return{contactListHeader:{backgroundColor:"#f1f1f1",padding:"5px 10px"}}})),Q=function(e){var a=e.someSelected,t=e.allSelected,n=e.deselectAll,c=e.selectAll,i=H();return r.a.createElement(T.a,{container:!0,className:i.contactListHeader},r.a.createElement(T.a,{item:!0,container:!0,xs:12,style:{alignItems:"center"}},r.a.createElement(T.a,{item:!0,md:1,xs:2,sm:2},r.a.createElement(G.a,{onClick:function(){return t||a?n():c()},color:"primary",indeterminate:a&&!t,checked:t||a})),r.a.createElement(T.a,{item:!0,md:5,xs:10,sm:9},"Basic Info"),r.a.createElement(O.a,{smDown:!0},r.a.createElement(T.a,{item:!0,md:5},"Company")),r.a.createElement(O.a,{xsDown:!0},r.a.createElement(T.a,{item:!0,md:1,sm:1},"Edit"))))},V=t(22),J=t(43),K=t(128),Y=t(116),X=t(117),Z=t(118),$=Object(p.a)((function(e){return{contact:{margin:"10px 0px",padding:"0px 10px","&:hover,&.active":{backgroundColor:"#e8ecef",cursor:"pointer"}},basicInfo:{display:"flex"},avatarWrapper:{padding:"10px 10px 10px 0px"},contactAvatar:{height:"50px",width:"50px"},contactName:{display:"flex",flexDirection:"column",justifyContent:"center"},noMargin:{margin:0},editBtn:{background:"linear-gradient(to right, #fa8569, #ff4b6e)",color:"#ffffffbf"}}})),_=function(e){var a=e.contact,t=e.selectContact,c=e.active,i=e.editContact,o=e.isNewContact,l=e.saveContact,s=e.checkContact,d=$(),m=Object(J.a)(),p=m.register,f=m.handleSubmit,b=m.errors,h=a.id,E=a.avatar,x=a.name,C=a.email,v=a.company,k=a.checked,y=Object(n.useState)(""),w=Object(V.a)(y,2),j=w[0],N=w[1];return r.a.createElement(T.a,{container:!0,alignItems:"center",name:"contactItem",className:Object(u.a)(d.contact,c&&"active"),onClick:function(){return t(h)}},r.a.createElement(T.a,{item:!0,md:1,xs:2,sm:2},r.a.createElement(G.a,{onClick:function(e){s(h),e.stopPropagation()},color:"primary",checked:k||!1,disabled:o})),r.a.createElement(T.a,{item:!0,md:5,xs:10,sm:9},r.a.createElement(I.a,{className:d.basicInfo},r.a.createElement(I.a,{className:d.avatarWrapper},r.a.createElement(K.a,{src:E,className:d.contactAvatar,style:{backgroundColor:function(e){for(var a=0,t=0;t<e.length;t++)a=e.charCodeAt(t)+((a<<5)-a);var n="#";for(t=0;t<3;t++){n+=("00"+(a>>8*t&255).toString(16)).substr(-2)}return n+"bf"}(x+C)}},o?"":x.split(" ").map((function(e){return e[0]})))),r.a.createElement(I.a,{className:d.contactName},r.a.createElement("h3",{className:d.noMargin},o?r.a.createElement(Y.a,{name:"name",error:void 0!==b.name,inputRef:p({required:{value:!0,message:"This field is required"}}),placeholder:"John Doe",defaultValue:j,onClick:function(e){return e.stopPropagation()},onChange:function(e){return N(e.target.value)}}):x),r.a.createElement("small",null,o?"":C)))),r.a.createElement(O.a,{smDown:!0},r.a.createElement(T.a,{item:!0,md:5},r.a.createElement("h4",{className:d.noMargin},o?"":v))),r.a.createElement(O.a,{xsDown:!0},r.a.createElement(T.a,{item:!0,md:1,sm:1},o?r.a.createElement(g.a,{size:"small",className:d.editBtn,onClick:f((function(){l(j)}))},r.a.createElement(X.a,null)):r.a.createElement(g.a,{size:"small",className:d.editBtn,onClick:function(e){i(h),e.stopPropagation()}},r.a.createElement(Z.a,null)))))},ee=t(119),ae=t(120),te=Object(p.a)((function(e){var a;return{extendedIcon:{marginRight:e.spacing(1)},formWrapper:Object(m.a)({paddingLeft:"60px"},e.breakpoints.down("md"),{padding:"20px 0px"}),contactForm:(a={backgroundColor:"#f1f1f1",padding:"30px 40px",width:"100%",position:"relative"},Object(m.a)(a,e.breakpoints.only("sm"),{padding:"30px"}),Object(m.a)(a,e.breakpoints.only("xs"),{padding:"20px"}),a),formHeader:Object(m.a)({display:"flex",alignItems:"center",textAlign:"center",flexDirection:"column",paddingBottom:40},e.breakpoints.only("xs"),{paddingBottom:20}),avatar:{height:"80px",width:"80px"},fallbackText:{fontSize:28},noBottomMargin:{marginBottom:0},saveBtn:{background:"linear-gradient(to right, #fa8569, #ff4b6e)",color:"#ffffffbf"},formRow:Object(m.a)({alignItems:"baseline",padding:"10px 0px"},e.breakpoints.only("xs"),{padding:"10px 0px"}),editBtn:{background:"linear-gradient(to right, #fa8569, #ff4b6e)",color:"#ffffffbf",position:"absolute",right:20}}})),ne=function(e){var a=e.selectedContact,t=e.editable,n=e.updateContact,c=e.editContact,i=te(),o=Object(J.a)(),l=o.register,s=o.handleSubmit,d=o.errors,m=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t?a[e]:""===a[e]||void 0===a[e]?"N/A":a[e]};return r.a.createElement(T.a,{item:!0,lg:6,xs:12},r.a.createElement(T.a,{item:!0,container:!0,md:12,className:i.formWrapper},r.a.createElement(I.a,{className:i.contactForm},r.a.createElement(O.a,{smUp:!0},r.a.createElement(g.a,{size:"small",className:i.editBtn,onClick:function(){return c(a.id)}},r.a.createElement(Z.a,null))),r.a.createElement(I.a,{className:i.formHeader},r.a.createElement(K.a,{className:i.avatar,src:a.avatar},m("name").split(" ").map((function(e){return e[0]}))),r.a.createElement("h2",{className:i.noBottomMargin},m("name")),r.a.createElement("small",null,m("about"))),r.a.createElement(T.a,{container:!0},r.a.createElement(T.a,{item:!0,container:!0,className:i.formRow},r.a.createElement(T.a,{item:!0,xs:12,sm:3},"Full Name:"),r.a.createElement(T.a,{item:!0,xs:12,sm:9},t?r.a.createElement(Y.a,{fullWidth:!0,error:void 0!==d.name,inputRef:l({required:{value:!0,message:"This field is required"}}),defaultValue:m("name",t),name:"name"}):m("name",!1),r.a.createElement(ee.a,{error:!0},d.name?d.name.message:" "))),t&&r.a.createElement(T.a,{item:!0,container:!0,className:i.formRow},r.a.createElement(T.a,{item:!0,xs:12,sm:3},"About:"),r.a.createElement(T.a,{item:!0,xs:12,sm:9},t?r.a.createElement(Y.a,{fullWidth:!0,disabled:!t,disableUnderline:!t,error:void 0!==d.about,inputRef:l({required:{value:!0,message:"This field is required"}}),defaultValue:m("about",t),name:"about"}):m("about",!1),r.a.createElement(ee.a,{error:!0},d.about?d.about.message:" "))),r.a.createElement(T.a,{item:!0,container:!0,className:i.formRow},r.a.createElement(T.a,{item:!0,xs:12,sm:3},"Email:"),r.a.createElement(T.a,{item:!0,xs:12,sm:9},t?r.a.createElement(Y.a,{fullWidth:!0,disabled:!t,disableUnderline:!t,error:void 0!==d.email,inputRef:l({required:{value:!0,message:"This field is required"}}),defaultValue:m("email",t),name:"email"}):m("email",!1),r.a.createElement(ee.a,{error:!0},d.email?d.email.message:" "))),r.a.createElement(T.a,{item:!0,container:!0,className:i.formRow},r.a.createElement(T.a,{item:!0,xs:12,sm:3},"Phone:"),r.a.createElement(T.a,{item:!0,xs:12,sm:9},t?r.a.createElement(Y.a,{fullWidth:!0,disabled:!t,disableUnderline:!t,error:void 0!==d.phone,inputRef:l({required:{value:!0,message:"This field is required"}}),defaultValue:m("phone",t),name:"phone"}):m("phone",!1),r.a.createElement(ee.a,{error:!0},d.phone?d.phone.message:" "))),r.a.createElement(T.a,{item:!0,container:!0,className:i.formRow},r.a.createElement(T.a,{item:!0,xs:12,sm:3},"Company:"),r.a.createElement(T.a,{item:!0,xs:12,sm:9},t?r.a.createElement(Y.a,{fullWidth:!0,disabled:!t,disableUnderline:!t,error:void 0!==d.company,inputRef:l({required:{value:!0,message:"This field is required"}}),defaultValue:m("company",t),name:"company"}):m("company",!1),r.a.createElement(ee.a,{error:!0},d.company?d.company.message:" "))),r.a.createElement(T.a,{item:!0,container:!0,className:i.formRow},r.a.createElement(T.a,{item:!0,xs:12,sm:3},"Address:"),r.a.createElement(T.a,{item:!0,xs:12,sm:9},t?r.a.createElement(Y.a,{fullWidth:!0,disabled:!t,disableUnderline:!t,error:void 0!==d.address,inputRef:l({required:{value:!0,message:"This field is required"}}),defaultValue:m("address",t),name:"address"}):m("address",!1),r.a.createElement(ee.a,{error:!0},d.address?d.address.message:" "))),t&&r.a.createElement(T.a,{item:!0,container:!0,justify:"center"},r.a.createElement(ae.a,{variant:"extended",className:i.saveBtn,onClick:s((function(e){n(e)}))},r.a.createElement(X.a,{className:i.extendedIcon}),"Save"))))))},re=function(e){var a=e.contacts,t=e.selectedContact,n=e.selectContact,c=e.editContact,i=e.isEditing,o=e.updateContact,l=e.isAdding,s=e.saveContact,d=e.checkContact;return r.a.createElement(r.a.Fragment,null,a.map((function(e){return r.a.createElement(r.a.Fragment,{key:e.id},r.a.createElement(_,{contact:e,active:e.id===t.id,selectContact:n,editContact:c,saveContact:s,checkContact:d}),e.id===t.id&&r.a.createElement(O.a,{lgUp:!0},r.a.createElement(ne,{selectedContact:e,editable:i,editContact:c,updateContact:o})))})),l&&r.a.createElement(_,{contact:t,key:"newContact",active:!0,selectContact:function(){},editContact:function(){},isEditing:i,saveContact:s,isNewContact:l}))},ce=Object(p.a)((function(e){return{noContacts:{display:"flex",justifyContent:"center",alignItems:"center",height:"40vh"}}})),ie=function(e){var a=e.contacts,t=e.selectedContact,n=e.selectContact,c=e.editContact,i=e.isEditing,o=e.updateContact,l=e.saveContact,s=e.isAdding,d=e.checkContact,m=e.someSelected,u=e.allSelected,p=e.selectAll,f=e.deselectAll,g=ce();return r.a.createElement(T.a,{item:!0,lg:6,xs:12},r.a.createElement(Q,{someSelected:m,allSelected:u,selectAll:p,deselectAll:f}),a.length>0?r.a.createElement(re,{contacts:a,selectedContact:t,selectContact:n,editContact:c,isEditing:i,updateContact:o,isAdding:s,saveContact:l,checkContact:d}):r.a.createElement("h3",{className:g.noContacts},"No Contacts"))},oe=t(6),le=(t(70),[{id:"1",name:"Joey Tribbiani",about:"Actor",email:"joeyt@friends.com",phone:"+(069) 123-6547",company:"Actor Acadamy",address:"2738  Liberty Avenue, California"},{id:"2",name:"Rachel Green",about:"Fashion Designer",email:"greenrach@friends.com",phone:"718-896-1555",company:"Ralph Lauren",address:"377  Abia Martin Drive, Bethpage, New York"},{id:"3",name:"Ross Geller",about:"Paleontologist",email:"rossaurus@friends.com",phone:"",company:"Dianosaur Museum",address:"4437  Plainfield Avenue, HOPKINTON, Massachusetts"},{id:"4",name:"Phoebe Buffay",about:"Masseuse",email:"phebes@friends.com",phone:"802-232-8909",company:"",address:""},{id:"5",name:"Monica Geller",about:"Chef",email:"mon@friends.com",phone:"",company:"",address:""},{id:"6",name:"Chandler Bing",about:"Copywriter",email:"mrbing@friends.com",phone:"",company:"",address:"4709  Roosevelt Road, Dodge City, Kansas"},{id:"7",name:"Gunther",about:"Cafe Owner",email:"gunther@friends.com",phone:"330-443-9039",company:"Central Perk",address:""},{id:"8",name:"Jill Green",about:"Rachel's sister",email:"jgreen@gmail.com",phone:"",company:"",address:"2035  Nixon Avenue, Kingsport, Tennessee"},{id:"9",name:"Jack Geller",about:"Ross' father",email:"jackg@gmail.com",phone:"908-617-5594",company:"",address:"3033  Patterson Road, SPANGLE, Washington"}]),se=function(e){function a(e){var t;return Object(o.a)(this,a),(t=Object(l.a)(this,Object(s.a)(a).call(this,e))).setSelectedContact=function(e){var a=t.state,n=a.data,r=a.selectedContact,c=a.editable,i=e===le.length+1;t.setState({selectedContact:i?r:n.find((function(a){return a.id===e})),isAdding:i,editable:c&&e===r.id})},t.setEditable=function(e){var a=t.state,n=a.data,r=a.selectedContact;t.setState({editable:e===r.id,selectedContact:n.find((function(a){return a.id===e}))})},t.updateContact=function(e){var a=t.state.selectedContact,n=le.findIndex((function(e){return e.id===a.id}));le[n]=Object.assign({},le[n],e),t.setState({data:le,editable:!1})},t.addContact=function(){t.setState({isAdding:!0,selectedContact:{id:le.length+1}})},t.saveContact=function(e){var a=t.state.selectedContact;le.push(Object(R.a)({},a,{name:e})),t.setState({data:le,isAdding:!1,searchQuery:""})},t.checkContact=function(e){var a=t.state.data,n=a.findIndex((function(a){return a.id===e}));a[n].checked=!a[n].checked,t.setState({data:a})},t.selectAll=function(){var e=t.state.data;e.forEach((function(e){return e.checked=!0})),t.setState({data:e})},t.deselectAll=function(){var e=t.state.data;e.forEach((function(e){return e.checked=!1})),t.setState({data:e})},t.deleteContact=function(){le=le.filter((function(e){return!e.checked})),t.setState({data:le,searchQuery:"",editable:!1,isAdding:!1,selectedContact:{}})},t.searchContact=function(e){var a=e.target.value,n=le.filter((function(e){return e.name.toLowerCase().includes(a.toLowerCase())}));t.setState({data:n,searchQuery:a,editable:!1,isAdding:!1,selectedContact:{}})},t.render=function(){var e=t.props.classes,a=t.state,n=a.data,c=a.selectedContact,i=a.editable,o=a.isAdding,l=a.searchQuery,s=n.length&&n.every((function(e){return e.checked})),d=n.some((function(e){return e.checked}));return r.a.createElement(T.a,{container:!0,className:e.outerSpacing},r.a.createElement(W,null),r.a.createElement(T.a,{container:!0,item:!0,md:12,className:e.innerSpacing},r.a.createElement(U,{addContact:t.addContact,deleteContact:t.deleteContact,searchQuery:l,searchContact:t.searchContact,someSelected:d}),r.a.createElement(ie,{contacts:n,selectedContact:c,selectContact:t.setSelectedContact,editContact:t.setEditable,updateContact:t.updateContact,isEditing:i,isAdding:o,saveContact:t.saveContact,checkContact:t.checkContact,selectAll:t.selectAll,deselectAll:t.deselectAll,allSelected:s,someSelected:d}),r.a.createElement(O.a,{mdDown:!0},r.a.createElement(ne,{selectedContact:n.find((function(e){return e.id===c.id}))||{},editable:i,updateContact:t.updateContact}))))},t.state={data:le,selectedContact:{},editable:!1,isAdding:!1,searchQuery:""},t}return Object(d.a)(a,e),a}(r.a.Component),de=Object(oe.a)((function(e){var a;return{outerSpacing:(a={padding:"50px 60px"},Object(m.a)(a,e.breakpoints.only("sm"),{padding:"30px 40px"}),Object(m.a)(a,e.breakpoints.only("xs"),{padding:"20px"}),a),innerSpacing:Object(m.a)({padding:"0px 40px"},e.breakpoints.down("sm"),{padding:"0px"})}}))(se),me=t(125),ue=function(e){function a(e){var t;return Object(o.a)(this,a),(t=Object(l.a)(this,Object(s.a)(a).call(this,e))).handleFullDrawerToggle=function(){t.setState({drawer:"open"===t.state.drawer?"close":"open"})},t.handleMiniDrawerToggle=function(){t.setState({drawer:"semi"===t.state.drawer?"open":"semi"})},t.render=function(){var e=t.props.classes,a=t.state.drawer;return r.a.createElement("div",{className:e.root},r.a.createElement(O.a,{smUp:!0},r.a.createElement(me.a,{open:"open"===a,className:e.backdrop})),r.a.createElement(N,{open:a,handleMiniDrawerToggle:t.handleMiniDrawerToggle}),r.a.createElement("div",{className:Object(u.a)(e.content,"open"===a&&e.contentPosition)},r.a.createElement(B,{handleFullDrawerToggle:t.handleFullDrawerToggle}),r.a.createElement(de,null)))},t.state={drawer:"semi"},t}return Object(d.a)(a,e),a}(r.a.Component),pe=Object(oe.a)((function(e){return{root:{display:"flex"},content:{width:"100%"},contentPosition:Object(m.a)({position:"static"},e.breakpoints.only("xs"),{position:"fixed"}),backdrop:{zIndex:e.zIndex.drawer-1}}}))(ue);t(71),t(72);i.a.render(r.a.createElement(pe,null),document.getElementById("root"))}},[[60,1,2]]]);
//# sourceMappingURL=main.48fa96c5.chunk.js.map