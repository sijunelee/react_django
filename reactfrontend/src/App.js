import React from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView';

//function App() { //컴포넌트, 일반적으로 클래스형 컴포넌트를 쓴다.
//함수형 컴포넌트는 변경불가되는 값을 다루고 ->props
//클래스형 컴포넌트는 변경가능한 값을 다룬다. ->state
class App extends React.Component{

  //생성자라는 놈은 선택에 따라 만들면 됩니다, 훈련이 필요
  constructor(props){
    super(props)
    this.state = {
      title: "",
      content: "",
      results:[],
    }
  }
  //데이터 요청은 마운트(render) 된 이후에 해주는 게 좋다.
  componentDidMount(){
    this.getPost() //함수를 바로 정의하지 않고, 함수를 다른 곳에서 호출하는 형식으로 사용
    //왜냐면 여기에 작성해버리면 
    //1. 코드가 복잡해지고
    //2. 글 전체 불러오는 코드를 다른 부분에서도 사용할 수 있는데 componentDidMount를 호출해야됨. 근데 componentDidMount는 React기본 함수이기 때문에 충돌발생 
  }
  async getPost(){
    const _results = await api.getAllPost()
    this.setState({results: _results.data}) //다시 렌더가 되겠지
  }

  handlingChange=(event)=>{ //글을 작성하게 해주는 함수
    this.setState(
      {  [event.target.name]: event.target.value   }
    )
    console.log(event.target)
  }

  handlingSubmit = async (event)=>{
    // onSubmit는 기본적으로 submit이 되면 "새로고침"이 된다
    // event의 기본동작을 중지시키겠다.
    event.preventDefault()
    let result = await api.createPost({title: this.state.title, content: this.state.content}) //1
    //console.log("완료!!", result)//2

    this.setState({title: "", content: ""})//초기화
    this.getPost() //글을 가져온다

  }
  handlingDelete = async (event)=>{
    await api.deletePost(event.target.value)
    this.getPost()
  }
  render() {
    return (
      <div className="App">
        <div className="PostingSection">
          <h2>글 작성하기</h2>
          <form onSubmit={this.handlingSubmit}>
            <input name="title" value={this.state.title} onChange={this.handlingChange}/>
            <textarea name="content" value={this.state.content} onChange={this.handlingChange}/>
            <button type="submit">제출하기</button>
          </form> 

        </div>

        <div className="ViewSection">
         {
           this.state.results.map( (post) => 
           <div>
            <PostView id ={post.id} title={post.title} content={post.content} />
            <button value={post.id} onClick={this.handlingDelete}>삭제하기</button>
           </div>
           )
         }
        </div>
      </div>
    );
  }
}

export default App;
