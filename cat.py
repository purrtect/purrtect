class Cat:
    def __init__(self, name_, skin_, hp_ = 20, dead_ = False):
        self.skin = skin_
        self.name = name_
        self.hp = hp_
        self.dead = dead_

    #10 kg of CO2 = 1 hp
    def get_hp_from_carbon(self, carbon_footprint, price):
        price_modifier = price * 0.01
        if (price_modifier>10):
            price_modifier = 10
        self.hp_change = round((32.87-carbon_footprint)/100*abs(price_modifier))
        if (self.hp_change > 3):
            self.hp_change = 3
        if (self.hp_change < -10):
            self.hp_change = -10
        return self.hp_change

    def change_hp(self, hp_change):
        self.hp += hp_change
        if (self.hp <= 0):
            self.dead = True
            self.hp = 0
        else:
            self.dead = False
        return
    
    def resurrect(self):
        self.hp = 20
        self.dead = False

    def to_array(self):
        return [self.name, self.hp, self.skin, self.dead]

    def to_dict(self):
        return ({
            'name': self.name,
            'hp': self.hp,
            'skin': self.skin,
            'dead': self.dead
        })

