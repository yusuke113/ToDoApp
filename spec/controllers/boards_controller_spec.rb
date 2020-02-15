require 'rails_helper'

RSpec.describe BoardsController, type: :controller do
  let(:boards) { Board.all }
  
  describe 'GET #index' do
    before { get :index }

    pending 'ログインしていない場合ログイン画面にリダイレクト'

    it 'assigns the requested boards to @boards' do
      expect(assigns(:boards)).to eq(boards)
    end

    it 'assigns the requested board to @board' do
      expect(assigns(:board)).to be_a_new(Board)
    end

    it 'レスポンスコードが200であること' do
      expect(response).to have_http_status(:ok)
    end

    it 'indexテンプレートをレンダリングすること' do
      expect(response).to render_template :index
    end

    it '新しいboardオブジェクトがビューに渡されること' do
      expect(assigns(:board)).to be_a_new(Board)
    end

  end

  describe 'POST #create' do

    context 'user loged-in and successfully saved' do
      
      pending '新規ボードをデータベースに保存'
      
    end

    context 'user loged-in but missed saved' do
      
      pending '新規ボードをデータベースに保存しない'
      
    end

    context 'user is not log-in' do
      
      pending 'ログインしてないユーザは保存させない'
      
    end
    
  end

  describe 'GET #show' do

  end


  describe 'PATCH #update' do

  end

  describe 'DELETE #destroy' do

  end
end
