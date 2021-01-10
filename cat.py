
class cat:
    def __init__(self, name_, colour_):
        self.colour = colour_
        self.name = name_
        self.hp = 20
        self.dead = False
        self.carbon_avg = 32.87 #average canadian carbon footprint per day

    #10 kg of CO2 = 1 hp
    def carbon_impact(self, carbon_footprint, price):
        price_modifier = price * 0.01
        if (price_modifier>10):
            price_modifier = 10
        self.hp_change = round((self.carbon_avg-carbon_footprint)/100*abs(price_modifier))
        if (self.hp_change > 3):
            self.hp_change = 3
        if (self.hp_change < -10):
            self.hp_change = -10
        return self.hp_change

    def health_point(self):
        self.hp += self.hp_change
        if (self.hp < 0):
            self.dead = True
            self.hp = 0
        else:
            self.dead = False
        return

