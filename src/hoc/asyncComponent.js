import React,{ Component } from "react";

const asyncComponent = (importComponent) =>{

    return class extends Component{
        state ={
            component:null//importされたcomponent自体がsetStateされる
        }
        componentDidMount(){
            importComponent().then(cmp =>{
                this.setState({component:cmp.default});
            });
        }

        render(){//stateのcomponentをrenderingする
            const C = this.state.component;
            return C ? <C {...this.props} /> :null;
        }
    }
}
export default asyncComponent;