const SimpleModal = ({ children, show, setShow }) => {
  const content = show && (
    <div className="overlay">
      <div className="modal">
        <button
          style={{position:"absolute",top:"0",right:"0"}}
          className="modal-close"
          type="button"
          onClick={() => setShow(false)}
        >
          x
        </button>
        <div className="modal-body">
          <dfn>
              <p style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
                <h3 style={{margin:0,color: "#ffb13e",letterSpacing:"2px"}} >General Artist</h3>
                <span style={{padding: "0 20px"}}>&</span>
                <h3 style={{margin:0,color: "#57b9cf",letterSpacing:"2px"}}>Software Engineer</h3>
            </p>
              <p style={{margin:"0"}}>Modeling, Sculpting, Texturing, Rigging & Animation (<small style={{letterSpacing:"2px"}}>Characters, Scenes, Architecture, Games, Films</small>)</p>
              
              <small style={{marginTop:"20px"}}> <b>Full-Stack Multi-Platform Software and Game Development</b> </small>
              <hr style={{width:"50%"}}/>

                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"flex-end",alignItems:"flex-end",alignSelf:"flex-end",flexDirection:"column"}}>
                    <a href="https://duno.vercel.app/" target="_blank">
                      <small>
                        Last Projects
                    </small>
                </a>

                    <a href="https://dunoabraham.artstation.com/" target="_blank">
                      <small>
                        Artstation | <small>@dunoabraham</small>
                    </small>
                </a>
                    <a href="https://www.instagram.com/3duno/" target="_blank">
                      <small>
                        Instagram | <small>@3duno</small>
                    </small>
                </a>
                    <a href="https://www.youtube.com/channel/UC0A0qWopy-2BnqYvFoENkug" target="_blank">
                      <small>
                        Youtube | <small>@3duno</small>
                    </small>
                </a>
              </div>
            {children}
          </dfn>
        </div>
      </div>
    </div>
  )

  return content
}

export default SimpleModal
