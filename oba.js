button d l    text(l). (0 < d | 0)() ₁ element(d - 1, counter).
counter d s   element(d, '+', button). element(d, '-', button). text('0').
shift p       1(p + 1).
cps           cp ₁ shift

a             cp(0x61).
b             cp(0x62).
S             S ₁ a ₀ b.

erti          1(1).
daumate a b   1(a + b).
ori           1(2).
sami          erti ₁ ori ₁ daumate. 
three'        daumate(1, 2).

text text

gcd x y
  ((x < y) | 0)() ₁ gcd(x, y - x)
₀ ((y < x) | 0)() ₁ gcd(x - y, y)
₀ 1(x).

eq l r          ((l===r)|0)().
lt l r          ((l < r)|0)().
le l r          ((l <=r)|0)().
gt l r          ((l > r)|0)().
ge l r          ((l >=r)|0)().
isIdentifierStart cp
                    
identifierStart la₁(lt(65)₁eq(36)
                  ₀ lt(91)
                  ₀ lt(97)₁eq(95)
                  ₀ lt(123)
                  ₀ le(0xffff)₁ge(0xaa)₁nonASCIIidentifierStart
                ) ₁ shift.
identifierChar  la₁(lt(48)₁eq(36)
                  ₀ lt(58)
                  ₀ lt(65)₁0()
                  ₀ lt(91)
                  ₀ lt(97)₁eq(95)
                  ₀ lt(123)
                  ₀ le(0xffff)₁ge(0xaa)₁nonASCIIidentifier
                ) ₁ shift.
many nar        nar₁many(nar)
