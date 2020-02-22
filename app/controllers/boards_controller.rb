class BoardsController < ApplicationController
  before_action :set_target_board, only: %i[show edit update destroy]

  def index
    @boards = Board.all
    @board = Board.new
  end

  def create
    board = Board.new(board_params)
    if board.save
      flash[:notice] = "「#{board.title}」のボードを作成しました"
      redirect_to board
    else
      render 'boards/index', flash: {
        board: board,
        error_messages: board.errors.full_messages
      }
    end
  end

  def show
    @list = List.new(board_id: @board.id)
  end

  def update
  end

  def destroy
    @board.destroy
    redirect_to root_path, flash: { notice: "「#{@board.title}の掲示板が削除されました」" }
  end

  private

    def board_params
      params.require(:board).permit(:title)
    end

    def set_target_board
      @board = Board.find(params[:id])
    end



end
