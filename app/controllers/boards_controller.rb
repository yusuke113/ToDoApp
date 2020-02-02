class BoardsController < ApplicationController

  def index
    @boards = Board.all
    @board = Board.new
  end

  def new

  end

  def create
    @board = Board.new(board_params)
    if @board.save
      flash[:notice] = "「#{@board.title}」の掲示板を作成しました"
      redirect_to board
    else
      redirect_to new_board_path, flash: {
        board: @board,
        error_messages: board.errors.full_messages
      }
    end
  end

  def edit
  end

  def update
  end

  def show
    @board = Board.find(id: params[:id])
  end

  def destroy
  end

  private

    def board_params
      params.require(:board).permit(:title)
    end



end
