class PortfoliosController < ApplicationController
  def index
    @portfolios = Portfolio.all
    @coins = Coin.all
    @total = 0
    @positions = Position.all
    @positions.each do |position|
      @total += position.amount
    end
  end

  def show
    @coins = Coin.all
    @total = 0
    @positions = Position.where(portfolio_id: params[:id])
    @positions.each do |position|
      @total += position.amount
    end
  end

  def create
    @portfolio = Portfolio.new(portfolio_params)
    if @song.save
      redirect_to portfolio_path(@portfolio)
    else
      render :index
    end
  end

  def update
    @portfolio = Portfolio.find(param[:id])
    @portfolio.update(portfolio_params)
  end

  def destroy
    @portfolio.find(param[:id])
    @portfolio.destroy
    redirect_to portfolios_path
  end

  private

  def portfolio_params
    params.require(:portfolio).permit(:coin, :entry_date, :amount, :quantity, :exit_date, :exchange)
  end
end
