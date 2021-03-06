class MarketController < ApplicationController
  skip_before_action :authenticate_user!, only: :index

  def index
    require 'net/http'
    require 'json'
    require 'active_support'
    extend ActionView::Helpers::NumberHelper
    @coins = Coin.all
    i = 0
    @moyenne_change = 0
    @total_value = 0
    @coins.each do |coin|
      coin.quantity = coin.sum(params[:id])
      url = "https://api.lunarcrush.com/v2?data=assets&key=dobdvvfchtpmfr5qq1nu&symbol=#{coin.title}"
      uri = URI(url)
      response = Net::HTTP.get(uri)
      reponse = JSON.parse(response)
      marketcap = reponse['data'][0]['market_cap']
      coin.marketcap = marketcap
      price = reponse['data'][0]['price'].to_f
      coin.price = price
      change = reponse['data'][0]['percent_change_24h'].to_f
      coin.change = change
      @moyenne_change += change * (coin.price * coin.quantity)
      @total_value += price * coin.quantity
      i += 1 * (coin.price * coin.quantity)
    end
    @coins = @coins.sort_by(&:marketcap).reverse

    @moyenne_change = @moyenne_change / i.to_f
    @portfolios = Portfolio.where(user: current_user)
    @portfolio = @portfolios.first
    @positions = Position.where(portfolio: @portfolios)
  end
end
