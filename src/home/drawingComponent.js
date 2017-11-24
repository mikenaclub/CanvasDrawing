import React from 'react'
import io from 'socket.io-client'
import './drawingComponent.css'
class DrawingComponent extends React.Component{
    constructor() {
        super();
        this.state = {
            socket: io('http://localhost:8090'),
            canvas:"",
            ctx:"",
            flag: false,
            prevX : 0,
            currX : 0,
            prevY : 0,
            currY : 0,
            dot_flag : false,
            x : "black",
            y : 2,
            w :"",
            h :"",
            image : new Image()
        }
    }
    componentWillMount(){
        this.state.socket.on("updateImg",function(imgbase64){
            console.log("update")
            if(imgbase64 === 'clear'){
                this.state.ctx.clearRect(0,0,this.state.w,this.state.h)
            }else {
                this.state.image.src = imgbase64
                this.state.ctx.drawImage(this.state.image,0,0)
            }
        }.bind(this))
    }
    //https://stackoverflow.com/questions/2368784/draw-on-html5-canvas-using-a-mouse
    componentDidMount() {
        this.refs.canvas.width = this.refs.canvas.offsetWidth
        this.refs.canvas.height = this.refs.canvas.offsetHeight
        this.setState({
            canvas:this.refs.canvas,
            ctx:this.refs.canvas.getContext("2d"),
        })
        this.setState({
            w : this.refs.canvas.width,
            h : this.refs.canvas.height
        })

        this.refs.canvas.addEventListener("mousemove", function (e) {
            this.findxy('move', e)
        }.bind(this), false);
        this.refs.canvas.addEventListener("mousedown", function (e) {
            this.findxy('down', e)
        }.bind(this), false);
        this.refs.canvas.addEventListener("mouseup", function (e) {
            this.findxy('up', e)
        }.bind(this), false);
        this.refs.canvas.addEventListener("mouseout", function (e) {
            this.findxy('out', e)
        }.bind(this), false);

    }

    sentMessageToServ = () => {
        this.state.socket.emit("msg","Hello server!!");
        console.log("sentMsg");
    }

    init = () => {

    }
    color = (e) => {
        switch (e.target.id) {
            case "green":
                this.setState({
                    x: "green"
                })
                break;
            case "blue":
                this.setState({
                    x: "blue"
                })
                break;
            case "red":
                this.setState({
                    x: "red"
                })
                break;
            case "yellow":
                this.setState({
                    x: "yellow"
                })
                break;
            case "orange":
                this.setState({
                    x: "orange"
                })
                break;
            case "black":
                this.setState({
                    x: "black"
                })
                break;
            case "white":
                this.setState({
                    x: "white"
                })
                break;
        }
        if (this.state.x === "white") {
            this.setState({
                y: 14
            })
        }
        else {
            this.setState({
                y: 2
            })
        }
    }
    findxy = (res, e) => {
        if (res === 'down') {
            this.setState({
                prevX : this.state.currX,
                prevY : this.state.currY,
                currX : e.clientX - this.state.canvas.offsetLeft,
                currY : e.clientY - this.state.canvas.offsetTop,
                flag : true,
                dot_flag : true
            })
            if (this.state.dot_flag) {
                this.state.ctx.beginPath();
                this.state.ctx.fillStyle = this.state.x;
                this.state.ctx.fillRect(this.state.currX, this.state.currY, 2, 2);
                this.state.ctx.closePath();
                this.setState({
                    dot_flag : false
            })
            }
        }
        if (res === 'up' || res === "out") {
            this.setState({
                flag : false
            })
        }
        if (res === 'move') {
            if (this.state.flag) {
                this.setState({
                    prevX : this.state.currX,
                    prevY : this.state.currY,
                    currX : e.clientX -this.state.canvas.offsetLeft,
                    currY : e.clientY -this.state.canvas.offsetTop
                })
                this.draw();
            }
        }
    }
    draw = () => {
        this.state.ctx.beginPath();
        this.state.ctx.moveTo(this.state.prevX, this.state.prevY);
        this.state.ctx.lineTo(this.state.currX, this.state.currY);
        this.state.ctx.strokeStyle = this.state.x;
        this.state.ctx.lineWidth = this.state.y;
        this.state.ctx.stroke();
        this.state.ctx.closePath();
        this.postBase64ToServer();
    }
    postBase64ToServer = () =>{
        let time = 1000;
        setTimeout(function () {
            this.state.socket.emit("userDrawing",this.state.canvas.toDataURL())
        }.bind(this),time);
    }
    getImgData = () =>{
        console.log(this.state.canvas.toDataURL())
    }

    clearImg = () =>{
        this.state.ctx.clearRect(0,0,this.state.w,this.state.h)
        this.state.socket.emit("userDrawing","clear");
    }

    render(){
        return(
            <div id="app-detail" onClick={this.sentMessageToServ} onLoad={this.init}>
                <div id="tools">
                    <div id="color-tools">
                        <div id="selectColor">Choose Color</div>
                        <div id="green" onClick={this.color}></div>
                        <div id="blue" onClick={this.color}></div>
                        <div id="red" onClick={this.color}></div>
                        <div id="yellow" onClick={this.color}></div>
                        <div id="orange" onClick={this.color}></div>
                        <div id="black" onClick={this.color}></div>
                    </div>
                    <div id="color-tools">
                        <div id="eraser">Eraser</div>
                        <div id="white" onClick={this.color}></div>
                    </div>
                </div>
                <canvas id="canvas" ref="canvas"></canvas>
                <div>
                    <button onClick={this.getImgData}>Get Img Data</button>
                    <button onClick={this.clearImg}>Reset</button>
                </div>
            </div>
        )
    }
}

export default DrawingComponent;