class BoardsController < ApplicationController
  before_action :logged_in_user
  before_action :set_target_board, only: %i[show edit update destroy]

  def index
    @boards = current_user.boards
    @board = Board.new
  end

  def create
    board = Board.new(board_params)
    board.user_id = current_user.id
    if board.save
      redirect_to board
    else
      render 'boards/index', flash: {
        board: board,
        alert: board.errors.full_messages
      }
    end
  end

  def show
    @list = List.new(board_id: @board.id)
  end

  def update
    @board = Board.find(params[:id])
    respond_to do |format|
      if @board.update(board_params)
        format.html { redirect_to @board }
        format.json { render :show, status: :no_content }
        format.js
      else
        format.html { redirect_to @board }
        format.json { render :show, status: :internal_server_error }
      end
    end
  end

  def destroy
    @board.destroy
    redirect_to root_path, flash: { notice: "【#{@board.title}】のボードが削除されました" }
  end

  private

    def board_params
      params.require(:board).permit(:title)
    end

    def set_target_board
      @board = Board.find_by(id: params[:id])
      redirect_to root_url if @board.nil?
    end



end
