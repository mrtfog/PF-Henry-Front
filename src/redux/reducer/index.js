const initialState = {
    movies:[{
        _id:550,
        title:"Fight Club",
        summary: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground 'fight clubs' forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
        rating: 8.4,
        vote_count: 24840,
        duration: 139,
        release_date: "1999-10-15",
        image: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        onCinema: false,
        deleted: false,
        genres: [18]
      },


      {
        _id:150,
        title:"48 Hrs",
        summary: "A hard-nosed cop reluctantly teams up with a wise-cracking criminal temporarily paroled to him, in order to track down a killer.",
        rating: 6.668,
        vote_count: 1172,
        duration: 96,
        release_date: "1982-12-07",
        image: "/phNxblI8gWJxATAGd5G4Nts7GcL.jpg",
        onCinema: false,
        deleted: false,
        genres: [53]
  
      },
  
      {
        _id:150,
        title:"The Fisher King",
        summary: "Two troubled men face their terrible destinies and events of their past as they join together on a mission to find the Holy Grail and thus to save themselves.",
        rating: 7.3,
        vote_count: 1069,
        duration: 138,
        release_date: "1982-12-07",
        image: "/5mb1IV53luUNTRyF3TSC77X1KZs.jpg",
        onCinema: false,
        deleted: false,
        genres: [35]
  
      }
  
  ]
}


 export default function rootReducer(state= initialState, action) {
    
    switch(action.type){
        case 'GET_MOVIES': {
            return{
                ...state
            }
        }
        default: 
        return {
            ...state
        }


    }

}