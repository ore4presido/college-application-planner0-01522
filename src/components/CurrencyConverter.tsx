import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign } from "lucide-react";

const exchangeRates: Record<string, number> = {
  NGN: 1550, // Nigerian Naira
  GHS: 15, // Ghanaian Cedi
  KES: 155, // Kenyan Shilling
  ZAR: 19, // South African Rand
  EUR: 0.92, // Euro
  GBP: 0.79, // British Pound
};

export const CurrencyConverter = () => {
  const [usdAmount, setUsdAmount] = useState("100");
  const [selectedCurrency, setSelectedCurrency] = useState("NGN");

  const convertedAmount = parseFloat(usdAmount || "0") * exchangeRates[selectedCurrency];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSign className="mr-2 h-5 w-5 text-primary" />
          Currency Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="usd">Amount in USD</Label>
          <Input
            id="usd"
            type="number"
            step="0.01"
            value={usdAmount}
            onChange={(e) => setUsdAmount(e.target.value)}
            placeholder="Enter USD amount"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Convert to</Label>
          <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
            <SelectTrigger id="currency">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NGN">Nigerian Naira (NGN)</SelectItem>
              <SelectItem value="GHS">Ghanaian Cedi (GHS)</SelectItem>
              <SelectItem value="KES">Kenyan Shilling (KES)</SelectItem>
              <SelectItem value="ZAR">South African Rand (ZAR)</SelectItem>
              <SelectItem value="EUR">Euro (EUR)</SelectItem>
              <SelectItem value="GBP">British Pound (GBP)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Converted Amount</p>
          <p className="text-2xl font-bold text-primary">
            {convertedAmount.toLocaleString()} {selectedCurrency}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
