import React, { Component } from 'react';

import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

import { RueiroLogo } from '../../ui/icons';

class Text extends Component {

    animateName = () => (
        <Animate
            show={true}
            start={{
                opacity:0,
                rotate:0
            }}
            enter={{
                opacity:[1],
                rotate:[360],
                timing:{duration: 1000, ease: easePolyOut}
            }}
        >
          {({opacity, rotate})=>{
              return(
                  <div 
                    className="featured_name"
                    style={{
                        opacity,
                        transform: `translate(260px, 170px) rotateY(${rotate}deg)`
                    }}
                  >Rueiro</div>
              )
          }}  
        </Animate>
    );
        
    animateFirst = () => (
        <Animate
            show={true}
            start={{
                opacity:0,
                x:503,
                y:420
            }}
            enter={{
                opacity:[1],
                x:[240],
                y:[420],
                timing:{duration: 1000, ease: easePolyOut}
            }}
        >
          {({opacity, x, y})=>{
              return(
                  <div 
                    className="featured_first"
                    style={{
                        opacity,
                        transform: `translate(${x}px, ${y}px)`
                    }}
                  >CLUB FAMILIAR</div>
              )
          }}  
        </Animate>
    );

    animateLogo = () => (
        <Animate
            show={true}
            start={{
                opacity:0
            }}
            enter={{
                opacity:[1],
                timing:{delay: 800, duration: 500, ease: easePolyOut}
            }}
        >
          {({opacity})=>{
              return(
                  <div 
                    className="featured_logo"
                    style={{
                        opacity,
                        // background: `url(${RueiroLogo})`,
                        transform: `translate(855px, 100px)`
                    }}
                  >
                    <RueiroLogo 
                        link={false}
                        linkTo="/" 
                        width="220px"
                        height="200px"
                    />
                  </div>
              )
          }}  
        </Animate>
    );

  render() {
    return (
      <div className="featured_text">
        {this.animateName()}
        {this.animateFirst()}
        {this.animateLogo()}
      </div>
    );
  }
}

export default Text;